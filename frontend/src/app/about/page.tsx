'use client';

import { motion } from 'framer-motion';
import { Eye, Shield, Target } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="bg-obsidian text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto space-y-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Block */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-champagne/80">
            Company Overview
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight">
            About DRST Technologies
          </h1>
          <p className="text-lg text-champagne tracking-wide max-w-xl mx-auto font-light">
            Digital Solutions. Real Transformation.
          </p>
        </motion.div>

        {/* Intro Copy */}
        <motion.div variants={itemVariants} className="space-y-6 text-sm sm:text-base text-ivory/80 leading-relaxed bg-graphite/40 p-8 sm:p-10 border border-graphite/80 rounded-xl">
          <p>
            DRST Technologies is dedicated to engineering practical, modern digital transformations. 
            We build and deliver software and brands tailored to help businesses optimize operations 
            and establish a premium online footprint.
          </p>
          <p>
            Rather than deploying bloated, generic web templates, we prioritize writing high-quality, 
            type-safe code, securing sensitive application APIs, and implementing fast, accessible, 
            and scalable designs. We operate with absolute transparency—ensuring pricing structures 
            and deliverables are clearly defined before development begins.
          </p>
        </motion.div>

        {/* Core Focal Areas */}
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-center">
            Our Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-graphite/40 border border-graphite/80 rounded-xl space-y-3">
              <h3 className="text-lg font-bold font-display text-champagne">Modern Web Development</h3>
              <p className="text-xs text-ivory/60 leading-relaxed">
                Building responsive web systems using modern framework technology (like React, Next.js, and Node.js) 
                which scale cleanly as your business grows.
              </p>
            </div>
            <div className="p-6 bg-graphite/40 border border-graphite/80 rounded-xl space-y-3">
              <h3 className="text-lg font-bold font-display text-champagne">Business Websites</h3>
              <p className="text-xs text-ivory/60 leading-relaxed">
                Custom commercial web sites optimized for fast conversions, search visibility (SEO), 
                and accessible screen reading.
              </p>
            </div>
            <div className="p-6 bg-graphite/40 border border-graphite/80 rounded-xl space-y-3">
              <h3 className="text-lg font-bold font-display text-champagne">AI Automation</h3>
              <p className="text-xs text-ivory/60 leading-relaxed">
                Integrating AI workflow triggers, lead auto-responders, data processing flows, and WhatsApp 
                automation to reduce manual overhead.
              </p>
            </div>
            <div className="p-6 bg-graphite/40 border border-graphite/80 rounded-xl space-y-3">
              <h3 className="text-lg font-bold font-display text-champagne">Brand Identity</h3>
              <p className="text-xs text-ivory/60 leading-relaxed">
                Designing logos, typography guides, and customized corporate styles that visually separate 
                your identity from competitors.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Block */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-graphite/60 text-center">
          <div className="space-y-3 p-4">
            <div className="inline-flex p-3 bg-graphite rounded-full text-champagne mb-1 border border-graphite">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-mono font-bold text-champagne uppercase tracking-wider">Mission</h3>
            <p className="text-xs text-ivory/65 leading-relaxed">
              To deliver functional digital tools and custom automation that result in real business efficiency.
            </p>
          </div>
          <div className="space-y-3 p-4">
            <div className="inline-flex p-3 bg-graphite rounded-full text-champagne mb-1 border border-graphite">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-mono font-bold text-champagne uppercase tracking-wider">Vision</h3>
            <p className="text-xs text-ivory/65 leading-relaxed">
              To build modern, secure, and future-ready digital products that stand the test of time.
            </p>
          </div>
          <div className="space-y-3 p-4">
            <div className="inline-flex p-3 bg-graphite rounded-full text-champagne mb-1 border border-graphite">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-mono font-bold text-champagne uppercase tracking-wider">Integrity</h3>
            <p className="text-xs text-ivory/65 leading-relaxed">
              Strictly representing what is actually completed and tested, never fabricating testimonials or statistics.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
