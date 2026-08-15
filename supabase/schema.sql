-- Create UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date TIMESTAMPTZ NOT NULL DEFAULT now(),
    client_name TEXT NOT NULL,
    company_name TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT NOT NULL,
    budget TEXT,
    requirements TEXT NOT NULL,
    additional_information TEXT,
    enquiry_status TEXT NOT NULL DEFAULT 'New',
    whatsapp_status TEXT NOT NULL DEFAULT 'Pending',
    google_sheets_status TEXT NOT NULL DEFAULT 'Pending',
    project_status TEXT NOT NULL DEFAULT 'Not Started',
    website_delivered BOOLEAN NOT NULL DEFAULT false,
    free_update_used TEXT NOT NULL DEFAULT 'Not Used',
    payment_status TEXT NOT NULL DEFAULT 'Pending',
    total_amount NUMERIC NOT NULL DEFAULT 0,
    advance_paid NUMERIC NOT NULL DEFAULT 0,
    balance_amount NUMERIC NOT NULL DEFAULT 0,
    maintenance_required TEXT NOT NULL DEFAULT 'Not Required',
    maintenance_charges NUMERIC NOT NULL DEFAULT 0,
    notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Note: The backend will use the Supabase Service Role Key to insert and update rows, 
-- bypassing RLS safely from the server environment. If frontend direct insert was needed, 
-- we would add specific INSERT policies here. To keep credentials secure, all CRUD operations
-- will go through the Node.js backend.

-- Trigger function to automatically update updated_at on modify
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enquiries_updated_at
    BEFORE UPDATE ON enquiries
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
