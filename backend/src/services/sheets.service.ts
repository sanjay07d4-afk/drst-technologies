import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { supabase } from './supabase.service';

// Ensure dotenv strictly loads backend/.env regardless of execution working directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config(); // Fallback for process.cwd()

/**
 * Format Date in Asia/Kolkata timezone: YYYY-MM-DD
 */
export const formatDateKolkata = (date?: Date | string): string => {
  const d = date ? new Date(date) : new Date();
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(d);
  } catch (e) {
    return d.toISOString().substring(0, 10);
  }
};

/**
 * Format Time in Asia/Kolkata timezone: HH:mm:ss
 */
export const formatTimeKolkata = (date?: Date | string): string => {
  const d = date ? new Date(date) : new Date();
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    return formatter.format(d);
  } catch (e) {
    return d.toISOString().substring(11, 19);
  }
};

/**
 * Combined timestamp formatter retained for backward compatibility: YYYY-MM-DD HH:mm:ss
 */
export const formatTimestampKolkata = (date?: Date | string): string => {
  return `${formatDateKolkata(date)} ${formatTimeKolkata(date)}`;
};

export interface EnquiryRecord {
  id: string;
  date?: string | Date;
  client_name: string;
  email: string;
  company_name?: string | null;
  phone: string;
  service: string;
  budget?: string | null;
  requirements: string;
  additional_information?: string | null;
  enquiry_status?: string;
  [key: string]: any;
}

/**
 * Utility function to mask sensitive strings safely in diagnostics
 */
const maskString = (str?: string): string => {
  if (!str) return 'MISSING';
  if (str.length <= 8) return '****';
  return `${str.substring(0, 4)}...${str.substring(str.length - 4)}`;
};

/**
 * Utility function to mask email address safely
 */
const maskEmail = (email?: string): string => {
  if (!email) return 'MISSING';
  const parts = email.split('@');
  if (parts.length !== 2) return '****';
  const user = parts[0];
  const domain = parts[1];
  const maskedUser = user.length > 4 ? `${user.substring(0, 4)}...` : user;
  return `${maskedUser}@${domain}`;
};

/**
 * Synchronizes an enquiry record to Google Sheets server-side.
 * Connects via JWT service account, verifies spreadsheet metadata, checks worksheet existence,
 * initializes header row (A:K), prevents duplicate appends, and appends a single row.
 */
export const syncToGoogleSheets = async (
  enquiryId: string,
  enquiryData?: EnquiryRecord
): Promise<{ success: boolean; error?: string }> => {
  const isEnabled = process.env.ENABLE_SHEETS_SYNC === 'true';

  // Detect if both GOOGLE_SPREADSHEET_ID and GOOGLE_SHEET_ID are set and prefer GOOGLE_SPREADSHEET_ID
  if (process.env.GOOGLE_SPREADSHEET_ID && process.env.GOOGLE_SHEET_ID) {
    console.warn('[Google Sheets] Warning: Both GOOGLE_SPREADSHEET_ID and GOOGLE_SHEET_ID environment variables exist. Using GOOGLE_SPREADSHEET_ID as the canonical variable.');
  }

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || 'Enquiries';
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const privateKey = privateKeyRaw?.replace(/\\n/g, '\n');

  // Log safe diagnostics without exposing secrets
  console.log('[Google Sheets] Diagnostic Configuration Check:');
  console.log(`  - ENABLE_SHEETS_SYNC: ${isEnabled}`);
  console.log(`  - GOOGLE_SPREADSHEET_ID: ${spreadsheetId ? `Present (${maskString(spreadsheetId)})` : 'MISSING'}`);
  console.log(`  - GOOGLE_SHEET_NAME: ${sheetName}`);
  console.log(`  - GOOGLE_SERVICE_ACCOUNT_EMAIL: ${clientEmail ? `Present (${maskEmail(clientEmail)})` : 'MISSING'}`);
  console.log(`  - GOOGLE_PRIVATE_KEY: ${privateKey ? 'Present (RSA Key Loaded)' : 'MISSING'}`);

  if (!isEnabled && !spreadsheetId) {
    console.log(`[Google Sheets] Sync is disabled or not configured in environment variables for enquiry: ${enquiryId}`);
    return { success: true };
  }

  if (!isEnabled) {
    console.log(`[Google Sheets] ENABLE_SHEETS_SYNC is false. Skipping sync for enquiry ID: ${enquiryId}`);
    return { success: true };
  }

  try {
    let enquiry = enquiryData;

    // Fetch from Supabase if not directly provided
    if (!enquiry) {
      const { data, error: fetchError } = await supabase
        .from('enquiries')
        .select('*')
        .eq('id', enquiryId)
        .single();

      if (fetchError || !data) {
        throw new Error(`Failed to fetch enquiry details: ${fetchError?.message || 'Record not found'}`);
      }
      enquiry = data as EnquiryRecord;
    }

    if (!spreadsheetId || !clientEmail || !privateKey) {
      const missingKeys: string[] = [];
      if (!spreadsheetId) missingKeys.push('GOOGLE_SPREADSHEET_ID');
      if (!clientEmail) missingKeys.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
      if (!privateKey) missingKeys.push('GOOGLE_PRIVATE_KEY');
      const errMessage = `Google Sheets credentials incomplete. Missing environment variable(s): ${missingKeys.join(', ')}`;
      console.error(`[Google Sheets] ${errMessage}`);
      return { success: false, error: errMessage };
    }

    // Authenticate using Google Service Account JWT
    const auth = new google.auth.JWT(
      clientEmail,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // STEP 1: Fetch spreadsheet metadata to verify ID and permissions
    let spreadsheetMeta: any;
    try {
      spreadsheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
      console.log('[Google Sheets] Connected to spreadsheet successfully');
    } catch (getErr: any) {
      const status = getErr.status || getErr.code;
      const errMsg = getErr.message || '';

      if (status === 404 || errMsg.includes('Requested entity was not found')) {
        const rootCause = `Spreadsheet ID '${maskString(spreadsheetId)}' was not found or has NOT been shared with service account '${clientEmail}'. Action required: Verify spreadsheet ID and share spreadsheet with Editor permissions to ${clientEmail}`;
        console.error(`[Google Sheets] Root Cause Error (Reason A/B): ${rootCause}`);
        return { success: false, error: rootCause };
      }

      if (status === 403) {
        if (errMsg.includes('disabled') || errMsg.includes('has not been used')) {
          const rootCause = `Google Sheets API is disabled in Google Cloud Console for project. Action required: Enable Google Sheets API at https://console.developers.google.com/apis/api/sheets.googleapis.com/overview`;
          console.error(`[Google Sheets] Root Cause Error (Reason D): ${rootCause}`);
          return { success: false, error: rootCause };
        }
        const rootCause = `Permission denied for service account '${clientEmail}' on spreadsheet '${maskString(spreadsheetId)}'. Action required: Grant Editor access to ${clientEmail}`;
        console.error(`[Google Sheets] Root Cause Error (Reason B): ${rootCause}`);
        return { success: false, error: rootCause };
      }

      const rootCause = `Failed to connect to Google Sheets API: ${errMsg}`;
      console.error(`[Google Sheets] ${rootCause}`);
      return { success: false, error: rootCause };
    }

    // STEP 2: Verify worksheet named GOOGLE_SHEET_NAME exists
    const existingSheets = spreadsheetMeta.data.sheets || [];
    const availableWorksheets = existingSheets
      .map((s: any) => s.properties?.title)
      .filter(Boolean);

    const worksheetExists = availableWorksheets.includes(sheetName);

    if (!worksheetExists) {
      const rootCause = `Worksheet/tab named '${sheetName}' does not exist in spreadsheet '${maskString(spreadsheetId)}'. Available worksheets: [${availableWorksheets.join(', ')}]. Action required: Rename worksheet tab to '${sheetName}' or update GOOGLE_SHEET_NAME in backend/.env.`;
      console.error(`[Google Sheets] Root Cause Error (Reason C): ${rootCause}`);
      return { success: false, error: rootCause };
    }

    console.log(`[Google Sheets] Verified worksheet: ${sheetName}`);

    // STEP 3: Inspect existing values for Header check and Duplicate protection (Range A:K)
    let existingValues: any[][] = [];
    try {
      const rangeRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A:K`,
      });
      existingValues = rangeRes.data.values || [];
    } catch (rangeErr: any) {
      console.warn('[Google Sheets] Existing values check warning (proceeding):', rangeErr.message || 'Check skipped');
    }

    // STEP 4: Auto-initialize Header row if worksheet is empty (A1:K1)
    if (existingValues.length === 0) {
      const headerRow = [
        'Submission Date (IST)',
        'Submission Time (IST)',
        'Enquiry ID',
        'Client Name',
        'Email',
        'Phone',
        'Company',
        'Service Required',
        'Budget',
        'Requirements',
        'Additional Information'
      ];
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:K1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headerRow]
        }
      });
      console.log(`[Google Sheets] Initialized header columns on worksheet: ${sheetName}`);
    }

    // STEP 5: Duplicate protection check (Enquiry ID is now in Column C -> row[2])
    const currentEnquiryId = enquiry.id || enquiryId;
    const isDuplicate = existingValues.some(row => row && row.length > 2 && row[2] === currentEnquiryId);

    if (isDuplicate) {
      console.log(`[Google Sheets] Duplicate check: Enquiry ID ${currentEnquiryId} is already present in Google Sheet '${sheetName}'. Skipping duplicate append.`);
      return { success: true };
    }

    // STEP 6: Format 11-column row values with separate Date and Time in Asia/Kolkata timezone
    const dateStr = formatDateKolkata(enquiry.date);
    const timeStr = formatTimeKolkata(enquiry.date);

    const rowValues = [
      dateStr,                               // Col A: Submission Date (IST)
      timeStr,                               // Col B: Submission Time (IST)
      currentEnquiryId,                      // Col C: Enquiry ID
      enquiry.client_name || '',             // Col D: Client Name
      enquiry.email || '',                   // Col E: Email
      enquiry.phone || '',                   // Col F: Phone
      enquiry.company_name || '',            // Col G: Company
      enquiry.service || '',                 // Col H: Service Required
      enquiry.budget || '',                  // Col I: Budget
      enquiry.requirements || '',            // Col J: Requirements
      enquiry.additional_information || ''   // Col K: Additional Information
    ];

    // STEP 7: Append exactly one row to worksheet (Range A:K)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:K`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    console.log(`[Google Sheets] Successfully synced enquiry ID: ${currentEnquiryId}`);

    // Update status in Supabase if configured
    try {
      await supabase
        .from('enquiries')
        .update({ google_sheets_status: 'Synced' })
        .eq('id', currentEnquiryId);
    } catch (dbUpdateErr) {
      // Non-fatal
    }

    return { success: true };

  } catch (error: any) {
    const safeErrorMessage = error.message || 'Unknown error occurred during Google Sheets sync';
    console.error(`[Google Sheets] Enquiry sync failed for ID ${enquiryId}:`, safeErrorMessage);

    try {
      await supabase
        .from('enquiries')
        .update({ google_sheets_status: 'Failed' })
        .eq('id', enquiryId);
    } catch (dbUpdateErr) {
      // Non-fatal
    }

    return { success: false, error: safeErrorMessage };
  }
};
