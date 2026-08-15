'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Loader2, Sparkles, Phone, MessageSquare, Mail } from 'lucide-react';

export default function StartProject() {
  const router = useRouter();
  
  // Form State — preserves existing backend payload compatibility
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    phone: '',
    email: '',
    service: '',
    budget: '', // Retained internally for backend compatibility
    requirements: '',
    additional_information: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  // Play custom synthesized sound chime
  const playSuccessChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      // High-pitched pleasant dual chime
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);

      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(880.00, ctx.currentTime); // A5
        gain2.gain.setValueAtTime(0, ctx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.5);
      }, 120);

    } catch (e) {
      console.warn('Web Audio Context not supported or allowed by browser policies.', e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errs: string[] = [];
    if (!formData.client_name.trim()) errs.push('Full Name is required');
    if (!formData.phone.trim()) errs.push('Phone Number is required');
    if (!formData.email.trim() || !formData.email.includes('@')) errs.push('A valid Email address is required');
    if (!formData.service) errs.push('Please select a Service Required');
    if (!formData.requirements.trim() || formData.requirements.trim().length < 10) {
      errs.push('Project requirements details must be at least 10 characters');
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || result.errors?.join(', ') || 'Submission failed');
      }

      // Success sequence
      setSuccess(true);
      playSuccessChime();
      
      // Delay redirection so the user can read the success message
      setTimeout(() => {
        router.push(`/thank-you?id=${result.enquiryId}`);
      }, 4000);

    } catch (err: any) {
      console.error('[StartProject Form] Submission Error:', err);
      setErrors([err.message || 'Unable to connect to the backend server. Please check your connection.']);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-obsidian border border-graphite rounded-lg px-4 py-3.5 min-h-[50px] text-sm text-ivory placeholder:text-ivory/30 focus:border-champagne focus:ring-1 focus:ring-champagne/40 focus:outline-none transition-all duration-200";

  return (
    <div className="bg-obsidian text-ivory py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-champagne/80">
            Let&apos;s Work Together
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
            Start Your Project
          </h1>
          <p className="text-sm sm:text-base text-ivory/60 leading-relaxed">
            Provide details about your web development, AI automation, or branding requirements below to request a tailored quote.
          </p>
        </div>

        {/* Success Notification Alert */}
        {success ? (
          <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-graphite/60 border-2 border-champagne rounded-xl space-y-4 text-center animate-fade-in shadow-2xl shadow-champagne/10">
            <div className="inline-flex p-3.5 bg-obsidian text-champagne rounded-full border border-champagne/40">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold font-display text-champagne">Submission Successful</h2>
            <p className="text-sm text-ivory/80 leading-relaxed max-w-lg mx-auto">
              Your project enquiry has been submitted successfully. Thank you for contacting DRST Technologies. 
              We will review your requirements and get in touch with you promptly.
            </p>
            <p className="text-xs font-mono text-champagne/70 animate-pulse pt-2">
              Redirecting you to the confirmation dashboard...
            </p>
          </div>
        ) : (
          /* Split-Screen Agency Form Layout — Fully Responsive */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Left Panel — Form (2/3 width on desktop, full width on mobile) */}
            <div className="lg:col-span-2 w-full">
              <div className="p-6 sm:p-9 md:p-10 bg-graphite/40 border border-graphite/80 rounded-xl space-y-7">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-champagne/70 block mb-1">
                    Enquiry Form
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-champagne">
                    Send Us a Message
                  </h2>
                </div>

                {/* Error Message Box */}
                {errors.length > 0 && (
                  <div className="p-4 bg-obsidian border border-champagne/40 text-champagne text-xs rounded-lg space-y-1">
                    <span className="font-semibold block">Please fix the following issues:</span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="client_name" className="block text-xs font-mono font-bold uppercase tracking-wider text-champagne/90 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="client_name"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-champagne/90 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="company_name" className="block text-xs font-mono font-bold uppercase tracking-wider text-champagne/90 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="Company name"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-champagne/90 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(000) 000-0000"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Selection */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-mono font-bold uppercase tracking-wider text-champagne/90 mb-2">
                      What Can We Help With? *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="" disabled>Select service</option>
                      <option value="Website Development">Website Development</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="Logo & Brand Identity">Logo &amp; Brand Identity</option>
                      <option value="Custom Digital Solution">Custom Digital Solution</option>
                    </select>
                  </div>

                  {/* Row 4: Project Details */}
                  <div>
                    <label htmlFor="requirements" className="block text-xs font-mono font-bold uppercase tracking-wider text-champagne/90 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your goals, requirements, timeline, and anything else we should know..."
                      className={`${inputClasses} resize-y min-h-[120px]`}
                    />
                  </div>

                  {/* Row 5: Additional Information */}
                  <div>
                    <label htmlFor="additional_information" className="block text-xs font-mono font-bold uppercase tracking-wider text-champagne/90 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="additional_information"
                      name="additional_information"
                      value={formData.additional_information}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any integrations or other details (optional)..."
                      className={`${inputClasses} resize-y min-h-[90px]`}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center py-4 px-6 text-xs font-bold uppercase tracking-widest text-obsidian bg-champagne hover:bg-mutedgold disabled:bg-champagne/50 rounded-sm transition-all duration-300 shadow-md shadow-champagne/10 cursor-pointer hover:-translate-y-0.5 min-h-[50px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Submitting Enquiry...
                        </>
                      ) : (
                        <>
                          START YOUR PROJECT
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Panel — Reach Us Directly (1/3 width on desktop, stacks below on mobile) */}
            <div className="lg:col-span-1 w-full flex flex-col">
              <div className="p-6 sm:p-8 bg-graphite/40 border border-graphite/80 rounded-xl flex-1 flex flex-col justify-between space-y-8">
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-champagne/70 block">
                    Direct Channels
                  </span>
                  <h2 className="text-xl font-bold font-display text-champagne">
                    Reach Us Directly
                  </h2>
                  <p className="text-xs sm:text-sm text-ivory/60 leading-relaxed">
                    Prefer to reach out directly? Connect with us via any of our verified communication channels.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Phone */}
                  <a
                    href="tel:+918870620760"
                    className="flex items-start gap-3.5 group p-3 rounded-lg hover:bg-graphite/40 transition-colors"
                  >
                    <div className="p-2.5 bg-obsidian rounded-lg text-champagne border border-graphite group-hover:border-champagne/40 group-hover:scale-105 transition-all shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-ivory/40 uppercase tracking-wider block">Phone</span>
                      <span className="text-sm font-bold font-display text-champagne group-hover:text-ivory transition-colors">8870620760</span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918870620760"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 group p-3 rounded-lg hover:bg-graphite/40 transition-colors"
                  >
                    <div className="p-2.5 bg-obsidian rounded-lg text-champagne border border-graphite group-hover:border-champagne/40 group-hover:scale-105 transition-all shrink-0">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-ivory/40 uppercase tracking-wider block">WhatsApp</span>
                      <span className="text-sm font-bold font-display text-champagne group-hover:text-ivory transition-colors">8870620760</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:sanjay07d4@gmail.com"
                    className="flex items-start gap-3.5 group p-3 rounded-lg hover:bg-graphite/40 transition-colors"
                  >
                    <div className="p-2.5 bg-obsidian rounded-lg text-champagne border border-graphite group-hover:border-champagne/40 group-hover:scale-105 transition-all shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono font-bold text-ivory/40 uppercase tracking-wider block">Email</span>
                      <span className="text-sm font-bold font-display text-champagne group-hover:text-ivory transition-colors break-all">sanjay07d4@gmail.com</span>
                    </div>
                  </a>
                </div>

                {/* Assurance Note */}
                <div className="border-t border-graphite/60 pt-5">
                  <p className="text-xs text-ivory/40 leading-relaxed">
                    All submitted enquiries are processed securely and reviewed promptly by our engineering team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
