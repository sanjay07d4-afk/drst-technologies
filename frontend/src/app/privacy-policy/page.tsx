export default function PrivacyPolicy() {
  return (
    <div className="bg-obsidian text-ivory py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-champagne tracking-tight border-b border-graphite pb-4">
        Privacy Policy
      </h1>
      
      <p className="text-xs text-ivory/50">Last updated: August 14, 2026</p>

      <div className="space-y-6 text-sm text-ivory/80 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">1. Information We Collect</h2>
          <p>
            When you interact with our website, use the contact buttons, or fill out the enquiry form 
            on the "Start Your Project" page, we collect details including your:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full Name</li>
            <li>Company / Business Name</li>
            <li>Phone Number</li>
            <li>Email Address</li>
            <li>Requested Service and Project Requirements</li>
            <li>Additional project details voluntarily shared</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">2. How We Use Your Information</h2>
          <p>
            We process collected information to evaluate project specifications, compile commercial quotes, 
            communicate with you regarding project status, sync record logs, and initiate notifications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">3. Secure Database Storage</h2>
          <p>
            Client details are saved securely in our PostgreSQL database hosted on Supabase, and synced 
            to our central business sheet. We employ Row Level Security (RLS) policies and keep backend 
            credentials isolated from the client-side browser files.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">4. Third-Party Services</h2>
          <p>
            We synchronize lead workflows using official third-party API gateways (Google Sheets and WhatsApp Business API). 
            We do not sell, rent, or lease personal customer data to advertisers or unrelated vendors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">5. Contact Information</h2>
          <p>
            If you have questions regarding this privacy summary, please reach out to us at:
          </p>
          <p className="text-champagne font-mono font-semibold pt-1">
            sanjay07d4@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
