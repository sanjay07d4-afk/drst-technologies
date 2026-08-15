'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, MessageSquare, ClipboardCheck } from 'lucide-react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className="bg-obsidian text-ivory py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center space-y-12">
      <div className="space-y-6">
        {/* Success Tick */}
        <div className="inline-flex p-4 bg-graphite rounded-full text-champagne">
          <CheckCircle2 className="h-16 w-16" />
        </div>

        <h1 className="text-4xl font-bold font-display tracking-tight text-champagne">
          Enquiry Received
        </h1>

        <p className="text-base text-ivory/80 leading-relaxed max-w-lg mx-auto">
          Your project enquiry has been submitted successfully. Thank you for contacting 
          <strong> DRST Technologies</strong>. We will review your requirements and get in touch 
          with you shortly.
        </p>
      </div>

      {/* Confirmation Details Card */}
      {id && (
        <div className="p-6 bg-graphite border border-graphite rounded-sm space-y-3 text-left">
          <div className="flex items-center space-x-2 text-champagne">
            <ClipboardCheck className="h-5 w-5" />
            <h2 className="font-display font-semibold text-sm uppercase tracking-wider">
              Enquiry Tracking Details
            </h2>
          </div>
          <p className="text-xs text-ivory/60">
            Keep a note of your unique submission tracking code below for reference during discussions.
          </p>
          <div className="p-3 bg-obsidian rounded-sm border border-graphite text-center font-mono text-xs sm:text-sm text-champagne font-bold select-all">
            {id}
          </div>
        </div>
      )}

      {/* Follow up Action buttons */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-graphite text-xs font-semibold uppercase tracking-wider text-ivory bg-graphite rounded-sm hover:border-champagne/45 transition-all duration-300"
          >
            Back to Home
          </Link>
          <a
            href="https://wa.me/918870620760"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-champagne text-xs font-semibold uppercase tracking-wider text-obsidian bg-champagne rounded-sm hover:bg-mutedgold hover:border-mutedgold transition-all duration-300"
          >
            Discuss on WhatsApp
            <MessageSquare className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ThankYou() {
  return (
    <Suspense
      fallback={
        <div className="bg-obsidian min-h-[50vh] flex items-center justify-center text-center">
          <p className="text-champagne animate-pulse text-sm">Loading enquiry dashboard...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
