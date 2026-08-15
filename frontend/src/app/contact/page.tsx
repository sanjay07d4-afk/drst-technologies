'use client';

import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const contacts = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'PHONE',
      value: '8870620760',
      href: 'tel:+918870620760',
      description: 'Direct line for project discussions and inquiries.'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'WHATSAPP',
      value: '8870620760',
      href: 'https://wa.me/918870620760',
      external: true,
      description: 'Quick messaging and real-time requirement sharing.'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'EMAIL',
      value: 'sanjay07d4@gmail.com',
      href: 'mailto:sanjay07d4@gmail.com',
      description: 'Send complete project specs and documentation.'
    }
  ];

  return (
    <div className="bg-obsidian text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-champagne/80">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-ivory/60 leading-relaxed max-w-lg mx-auto">
            Connect with DRST Technologies directly through our active channels or initiate a project enquiry.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
          {/* Left Column — Reach Us Directly (3/5 width on desktop, full width on mobile) */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-champagne">
              Reach Us Directly
            </h2>
            <div className="space-y-4">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-5 sm:p-6 bg-graphite/40 border border-graphite/80 rounded-xl hover:border-champagne/50 hover:bg-graphite/60 transition-all duration-300 group"
                >
                  <div className="p-3 bg-obsidian rounded-lg text-champagne border border-graphite group-hover:border-champagne/40 group-hover:scale-105 transition-all shrink-0">
                    {contact.icon}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-ivory/40 uppercase tracking-wider block">
                      {contact.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-display text-champagne block group-hover:text-ivory transition-colors break-all">
                      {contact.value}
                    </span>
                    <span className="text-xs text-ivory/50 block">
                      {contact.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column — Start Project Card (2/5 width on desktop, full width on mobile) */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="p-7 sm:p-9 bg-graphite/50 border border-graphite/80 rounded-xl space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-champagne/80 block">
                  Project Inquiries
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-ivory">
                  Have a Project in Mind?
                </h2>
                <p className="text-xs sm:text-sm text-ivory/60 leading-relaxed">
                  Submit details about your website development, AI automation, or brand identity requirements through our dedicated form for a tailored quotation.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/start-project"
                  className="inline-flex items-center justify-center w-full px-6 py-3.5 border border-champagne text-xs font-bold uppercase tracking-widest text-obsidian bg-champagne rounded-sm hover:bg-mutedgold hover:border-mutedgold transition-all duration-300 shadow-md shadow-champagne/10"
                >
                  START YOUR PROJECT
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
