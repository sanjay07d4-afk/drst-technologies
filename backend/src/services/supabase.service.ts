import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    'Warning: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured in environment variables.'
  );
}

// Create Supabase client with service role key to bypass RLS checks for administrative backend actions
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder_key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
