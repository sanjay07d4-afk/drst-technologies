export default function RefundPolicy() {
  return (
    <div className="bg-obsidian text-ivory py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-champagne tracking-tight border-b border-graphite pb-4">
        Refund & Cancellation Policy
      </h1>

      <p className="text-xs text-ivory/50">Last updated: August 14, 2026</p>

      <div className="space-y-6 text-sm text-ivory/80 leading-relaxed">
        <p>
          At DRST Technologies, we configure and deploy custom code, software automation, and visual design layouts 
          based strictly on details and scopes established prior to project launch.
        </p>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">1. Pre-Development Scope</h2>
          <p>
            Project specifications, milestones, and payment setups are fully reviewed and agreed upon 
            before development work begins. We execute code blocks based specifically on these directions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">2. Work Completed</h2>
          <p>
            Due to the custom nature of web engineering, software automation setups, and brand design graphics, 
            <strong> work already completed is non-refundable</strong>. Refunds are calculated strictly in proportion 
            to the project stage and completed code milestones.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">3. Cancellation Rules</h2>
          <p>
            If a client requests project cancellation before work has officially commenced, we will review the cancellation 
            and evaluate refund options, deducting processing or setup overheads where applicable.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">4. Third-Party Expenses</h2>
          <p>
            Any direct third-party expenses paid on behalf of the client (such as domain registrations, hosting server subscriptions, 
            database storage plans, Google Cloud API setups, or WhatsApp Cloud fees) are not refundable under any conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-champagne">5. Maintenance Charges</h2>
          <p>
            All paid updates, modifications, and maintenance work requested after the consumption of the one free minor 
            update are billed separately. Paid maintenance fees are final and non-refundable.
          </p>
        </section>

        <div className="p-4 bg-graphite/40 border border-graphite rounded-sm text-xs text-ivory/60">
          <strong>Notice:</strong> This policy constitutes commercial terms between DRST Technologies and the client. 
          It does not represent, nor should it be interpreted as, professional legal advice.
        </div>
      </div>
    </div>
  );
}
