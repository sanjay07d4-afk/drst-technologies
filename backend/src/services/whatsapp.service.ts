import axios from 'axios';
import dotenv from 'dotenv';
import { supabase } from './supabase.service';

dotenv.config();

export const sendWhatsAppNotification = async (enquiryId: string): Promise<{ success: boolean; error?: string }> => {
  const isEnabled = process.env.ENABLE_WHATSAPP_NOTIFY === 'true';

  if (!isEnabled) {
    console.log(`[WhatsApp Service] Notifications are disabled in environment variables for enquiry: ${enquiryId}`);
    return { success: true };
  }

  try {
    // 1. Fetch enquiry details from Supabase
    const { data: enquiry, error: fetchError } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', enquiryId)
      .single();

    if (fetchError || !enquiry) {
      throw new Error(`Failed to fetch enquiry from Supabase for WhatsApp: ${fetchError?.message || 'Not found'}`);
    }

    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipient = process.env.WHATSAPP_RECIPIENT_PHONE || '8870620760';
    const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

    if (!token || !phoneId) {
      throw new Error('WhatsApp notification is enabled but token or phoneId is missing from configurations.');
    }

    const cleanRecipient = recipient.replace(/\D/g, ''); // strip non-digits

    // Formulate a clean descriptive text block
    const textBody = `*New DRST Enquiry Recieved* 🚀\n\n` +
      `*Enquiry ID:* ${enquiry.id}\n` +
      `*Date:* ${new Date(enquiry.date).toLocaleDateString()}\n` +
      `*Name:* ${enquiry.client_name}\n` +
      `*Company:* ${enquiry.company_name || 'N/A'}\n` +
      `*Phone:* ${enquiry.phone}\n` +
      `*Email:* ${enquiry.email}\n` +
      `*Service:* ${enquiry.service}\n` +
      `*Budget:* ${enquiry.budget || 'N/A'}\n` +
      `*Requirements:* ${enquiry.requirements}\n` +
      `*Additional Info:* ${enquiry.additional_information || 'N/A'}`;

    const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
    
    let payload: any;

    if (templateName) {
      // Use template format (required for production if outside the 24h window or not sandbox)
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanRecipient,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: enquiry.client_name || 'Client' },
                { type: 'text', text: enquiry.company_name || 'None' },
                { type: 'text', text: enquiry.phone || 'None' },
                { type: 'text', text: enquiry.email || 'None' },
                { type: 'text', text: enquiry.service || 'None' },
                { type: 'text', text: enquiry.budget || 'None' },
                { type: 'text', text: enquiry.id || 'None' }
              ]
            }
          ]
        }
      };
    } else {
      // Use direct text format
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanRecipient,
        type: 'text',
        text: {
          body: textBody
        }
      };
    }

    // Send HTTP POST request to WhatsApp API
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10s timeout
    });

    console.log(`[WhatsApp Service] Message successfully sent for enquiry: ${enquiryId}. Response:`, response.data);

    // Update whatsapp_status in Supabase
    await supabase
      .from('enquiries')
      .update({ whatsapp_status: 'Sent' })
      .eq('id', enquiryId);

    return { success: true };

  } catch (error: any) {
    console.error(`[WhatsApp Service] Error sending notification for enquiry: ${enquiryId}`, error.response?.data || error.message);

    // Save failure status to Supabase (do not throw error to keep client response successful)
    await supabase
      .from('enquiries')
      .update({ whatsapp_status: 'Failed' })
      .eq('id', enquiryId);

    return { success: false, error: error.message || 'Unknown error' };
  }
};
