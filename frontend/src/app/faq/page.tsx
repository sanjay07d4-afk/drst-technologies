'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      q: 'What services does DRST Technologies provide?',
      a: 'We provide custom website development (basic, business, and premium sites), custom AI workflow automation scripts, and digital logo and brand identity design. We also have mobile app development planned for the future.'
    },
    {
      q: 'How is the project process structured?',
      a: 'Our process follows a clear 4-step sequence: (1) Discover: understanding your vision and goals. (2) Plan & Design: detailing architecture and UI/UX directions. (3) Develop & Test: writing code and executing responsiveness tests. (4) Launch & Support: deploying the system and handling maintenance.'
    },
    {
      q: 'How do you handle project pricing and quotations?',
      a: 'All our prices (e.g. Website Development starting from ₹7,999, AI Automation starting from ₹4,999) are initial starting estimates. Final project quotes depend entirely on custom features, workflow complexity, design depth, and overall scope. We do not provide fixed rigid pricing before discussing requirements.'
    },
    {
      q: 'How long do projects typically take?',
      a: 'Project timelines vary depending on scope. A basic website may take a couple of weeks, whereas complex custom business portals with database integrations or workflows require more time. Estimated milestones are agreed upon before work begins.'
    },
    {
      q: 'What is your website maintenance and update policy?',
      a: 'Once a website is delivered, the client receives one minor update (e.g. banner change, text edit, image replacement) free of charge. This is available only once. All subsequent updates and maintenance request items are charged separately based on scope.'
    },
    {
      q: 'What technologies do you use for development?',
      a: 'Our frontend projects are built using Next.js, React, TypeScript, and Tailwind CSS. The backend services run on Node.js, Express, and TypeScript, communicating with a secure PostgreSQL database hosted on Supabase.'
    },
    {
      q: 'What security measures do you implement?',
      a: 'We enforce security by keeping all API tokens on the backend using secure environment variables, enabling Supabase Row Level Security (RLS), validating inputs, configuring CORS, setting Helmet security headers, and routing traffic over HTTPS.'
    },
    {
      q: 'Are your websites optimized for SEO?',
      a: 'Yes, we implement basic technical SEO structure, including custom page titles, meta descriptions, correct HTML header hierarchy, robots.txt, sitemaps, clean routing, and meaningful image alt text. We do not guarantee Google search rankings.'
    },
    {
      q: 'Do you offer mobile app development?',
      a: 'Mobile app development is marked as "Coming Soon" and is not currently offered. We will announce it as soon as the service becomes active.'
    },
    {
      q: 'How can I submit a project enquiry?',
      a: 'You can navigate to the "Start Your Project" page and fill out our enquiry form (Name, Email, Phone, Company, Service, Budget, and Requirements). The system will write the lead to our database and alert our team.'
    }
  ];

  return (
    <div className="bg-obsidian text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-champagne/80">
          Got Questions?
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-ivory/60 max-w-lg mx-auto leading-relaxed">
          Find clear, truthful information regarding our services, technical policies, and development cycles.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4 pt-6">
        {faqData.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-graphite/40 border border-graphite/80 rounded-xl transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                type="button"
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-display font-semibold text-sm sm:text-base text-champagne focus:outline-none hover:bg-graphite/60 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-champagne shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-champagne shrink-0 ml-4" />
                )}
              </button>
              {isOpen && (
                <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-ivory/80 leading-relaxed border-t border-graphite/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
