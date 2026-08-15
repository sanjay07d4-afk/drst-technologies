import { Request, Response } from 'express';
import Joi from 'joi';
import crypto from 'crypto';
import { supabase } from '../services/supabase.service';
import { syncToGoogleSheets } from '../services/sheets.service';
import { sendWhatsAppNotification } from '../services/whatsapp.service';

// Enquiry Input Validation Schema — strictly preserving existing field contract
const enquirySchema = Joi.object({
  client_name: Joi.string().required().trim().max(100).messages({
    'any.required': 'Client name is required',
    'string.empty': 'Client name cannot be empty',
  }),
  company_name: Joi.string().allow('').trim().max(100),
  phone: Joi.string().required().trim().min(7).max(20).messages({
    'any.required': 'Phone number is required',
    'string.empty': 'Phone number cannot be empty',
  }),
  email: Joi.string().email().required().trim().lowercase().messages({
    'any.required': 'Email address is required',
    'string.email': 'Please enter a valid email address',
  }),
  service: Joi.string().required().trim().messages({
    'any.required': 'Selected service is required',
  }),
  budget: Joi.string().allow('').trim().max(50),
  requirements: Joi.string().required().trim().min(10).messages({
    'any.required': 'Project requirements are required',
    'string.min': 'Project requirements must be at least 10 characters long',
  }),
  additional_information: Joi.string().allow('').trim()
});

/**
 * Creates a new client enquiry, saves it to database, and triggers Google Sheets & WhatsApp integrations.
 */
export const createEnquiry = async (req: Request, res: Response) => {
  try {
    // 1. Validate Input
    const { error, value } = enquirySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map((d) => d.message);
      return res.status(400).json({ success: false, errors: errorDetails });
    }

    const generatedId = crypto.randomUUID();
    const submissionDate = new Date();

    // 2. Prepare database payload matching existing schema
    const payload = {
      id: generatedId,
      date: submissionDate.toISOString(),
      client_name: value.client_name,
      company_name: value.company_name || null,
      phone: value.phone,
      email: value.email,
      service: value.service,
      budget: value.budget || null,
      requirements: value.requirements,
      additional_information: value.additional_information || null,
      enquiry_status: 'New',
      whatsapp_status: 'Pending',
      google_sheets_status: 'Pending',
      project_status: 'Not Started',
      website_delivered: false,
      free_update_used: 'Not Used',
      payment_status: 'Pending',
      total_amount: 0,
      advance_paid: 0,
      balance_amount: 0,
      maintenance_required: 'Not Required',
      maintenance_charges: 0,
      notes: null,
      updated_at: submissionDate.toISOString()
    };

    let enquiryId = generatedId;
    let savedRecord = payload;

    // 3. Save securely to Supabase (if configured)
    const isSupabaseConfigured = 
      process.env.SUPABASE_URL && 
      !process.env.SUPABASE_URL.includes('placeholder') &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder');

    if (isSupabaseConfigured) {
      const { data: insertedData, error: dbError } = await supabase
        .from('enquiries')
        .insert([payload])
        .select()
        .single();

      if (dbError) {
        console.error('[Enquiry Controller] Supabase Insert Error:', dbError);
        return res.status(500).json({ 
          success: false, 
          message: 'A secure database error occurred while saving your enquiry. Please try again.' 
        });
      }

      if (insertedData) {
        enquiryId = insertedData.id;
        savedRecord = insertedData;
      }
      console.log(`[Enquiry Controller] Saved enquiry to Supabase with ID: ${enquiryId}`);
    } else {
      console.log(`[Enquiry Controller] Supabase not configured in local environment; processing enquiry with ID: ${enquiryId}`);
    }

    // 4. Synchronize with Google Sheets and WhatsApp server-side
    const sheetSyncResult = await syncToGoogleSheets(enquiryId, savedRecord);
    const whatsappResult = await sendWhatsAppNotification(enquiryId);

    // 5. Respond to client with Success response
    return res.status(201).json({
      success: true,
      message: 'Your project enquiry has been submitted successfully. Thank you for contacting DRST Technologies. We will review your requirements and get in touch with you.',
      enquiryId,
      integrations: {
        google_sheets: sheetSyncResult.success ? 'Synced' : 'Failed',
        whatsapp: whatsappResult.success ? 'Sent' : 'Failed'
      }
    });

  } catch (err: any) {
    console.error('[Enquiry Controller] Catch-all Error:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected internal server error occurred.'
    });
  }
};

/**
 * Retries syncing an existing enquiry to Google Sheets and sending a WhatsApp message.
 */
export const retryEnquiryIntegrations = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: 'Enquiry ID is required' });
    }

    // Check if the enquiry exists
    const { data: enquiry, error: fetchError } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found in database.' });
    }

    console.log(`[Enquiry Controller] Retrying integrations for enquiry ID: ${id}`);

    const sheetSyncResult = await syncToGoogleSheets(id, enquiry);
    const whatsappResult = await sendWhatsAppNotification(id);

    return res.status(200).json({
      success: true,
      message: 'Retried integrations successfully.',
      google_sheets: sheetSyncResult.success ? 'Success' : `Failed: ${sheetSyncResult.error}`,
      whatsapp: whatsappResult.success ? 'Success' : `Failed: ${whatsappResult.error}`
    });

  } catch (err: any) {
    console.error('[Enquiry Controller] Retry integrations error:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during synchronization retry.'
    });
  }
};
