'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Code, Cpu, Palette, LayoutDashboard, Terminal, CheckCircle2, Sparkles } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const services = [
    {
      num: '01',
      title: 'Web Development',
      desc: 'Custom websites and digital platforms engineered for performance, security, responsiveness, and scalability.',
      tag: 'Core Engineering',
      visual: (
        <div className="w-full h-44 bg-gradient-to-br from-graphite to-obsidian border border-graphite/80 rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-between group-hover:border-champagne/40 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-graphite/80 pb-2">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-champagne/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-champagne/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-champagne/20" />
            </div>
            <span className="text-[10px] font-mono text-champagne/60 tracking-wider">drst.tech/app.tsx</span>
          </div>
          <div className="font-mono text-[11px] text-ivory/60 space-y-1 py-1">
            <p className="text-champagne/80"><span className="text-ivory/40">const</span> system = <span className="text-champagne">createPlatform</span>({'{'}</p>
            <p className="pl-3 text-ivory/70">performance: <span className="text-champagne/90">'100/100'</span>,</p>
            <p className="pl-3 text-ivory/70">responsive: <span className="text-champagne/90">true</span></p>
            <p className="text-champagne/80">{'}'});</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-graphite/60 text-[10px] text-champagne/70 font-mono">
            <span className="flex items-center gap-1"><Code className="w-3 h-3 text-champagne" /> Next.js / TypeScript</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> Production Ready</span>
          </div>
        </div>
      )
    },
    {
      num: '02',
      title: 'AI Automation',
      desc: 'Intelligent workflow automation, lead processing, and business system integrations tailored to your operations.',
      tag: 'Workflow Intelligence',
      visual: (
        <div className="w-full h-44 bg-gradient-to-br from-graphite to-obsidian border border-graphite/80 rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-between group-hover:border-champagne/40 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-graphite/80 pb-2">
            <div className="flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-champagne" />
              <span className="text-[10px] font-mono text-champagne/80 font-bold uppercase tracking-wider">AI Pipeline</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-champagne/10 text-champagne border border-champagne/20">Automated</span>
          </div>
          <div className="grid grid-cols-3 gap-2 py-2 text-center">
            <div className="bg-obsidian/70 p-2 rounded border border-graphite text-[10px]">
              <span className="text-ivory/40 block text-[8px] uppercase">Input</span>
              <span className="text-champagne font-mono font-bold">New Lead</span>
            </div>
            <div className="bg-obsidian/70 p-2 rounded border border-champagne/30 text-[10px] relative">
              <span className="text-champagne block text-[8px] uppercase font-bold">Process</span>
              <span className="text-ivory font-mono font-bold">AI Filter</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-champagne rounded-full animate-ping" />
            </div>
            <div className="bg-obsidian/70 p-2 rounded border border-graphite text-[10px]">
              <span className="text-ivory/40 block text-[8px] uppercase">Output</span>
              <span className="text-champagne font-mono font-bold">WhatsApp</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-graphite/60 text-[10px] text-ivory/60 font-mono">
            <span>Latency: &lt;150ms</span>
            <span className="text-champagne flex items-center gap-1"><Sparkles className="w-3 h-3 text-champagne" /> 24/7 Active</span>
          </div>
        </div>
      )
    },
    {
      num: '03',
      title: 'Logo & Brand Identity',
      desc: 'Memorable brand visuals, logo systems, typography kits, and complete identity packages that set you apart.',
      tag: 'Brand Architecture',
      visual: (
        <div className="w-full h-44 bg-gradient-to-br from-graphite to-obsidian border border-graphite/80 rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-between group-hover:border-champagne/40 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-graphite/80 pb-2">
            <div className="flex items-center space-x-1.5">
              <Palette className="w-3.5 h-3.5 text-champagne" />
              <span className="text-[10px] font-mono text-champagne/80 font-bold uppercase tracking-wider">Identity Kit</span>
            </div>
            <span className="text-[9px] text-ivory/40 font-mono">Vector / Tokens</span>
          </div>
          <div className="flex items-center justify-around py-2">
            <div className="space-y-1 text-center">
              <div className="w-12 h-10 border border-champagne/40 rounded flex items-center justify-center bg-obsidian text-champagne font-display font-bold text-lg">
                D
              </div>
              <span className="text-[8px] text-ivory/50 font-mono uppercase">Monogram</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-[#0B0B0F] border border-graphite" title="Obsidian" />
                <div className="w-4 h-4 rounded bg-[#D4AF6A]" title="Champagne Gold" />
                <div className="w-4 h-4 rounded bg-[#F5F1E8]" title="Warm Ivory" />
                <div className="w-4 h-4 rounded bg-[#24242B]" title="Graphite" />
              </div>
              <span className="text-[8px] text-ivory/50 font-mono block text-center">Color Palette</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-graphite/60 text-[10px] text-champagne/70 font-mono">
            <span>Outfit / Inter System</span>
            <span>Scalable SVGs</span>
          </div>
        </div>
      )
    },
    {
      num: '04',
      title: 'Digital Products',
      desc: 'Future-proof digital tools, dashboards, databases, and custom systems architected for real-world impact.',
      tag: 'Custom Platforms',
      visual: (
        <div className="w-full h-44 bg-gradient-to-br from-graphite to-obsidian border border-graphite/80 rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-between group-hover:border-champagne/40 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-graphite/80 pb-2">
            <div className="flex items-center space-x-1.5">
              <LayoutDashboard className="w-3.5 h-3.5 text-champagne" />
              <span className="text-[10px] font-mono text-champagne/80 font-bold uppercase tracking-wider">System Dashboard</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">● Live Sync</span>
          </div>
          <div className="grid grid-cols-2 gap-2 py-1">
            <div className="bg-obsidian/70 p-2 rounded border border-graphite space-y-0.5">
              <span className="text-[8px] text-ivory/40 block uppercase">Database Queries</span>
              <span className="text-sm font-bold font-mono text-champagne">100%</span>
            </div>
            <div className="bg-obsidian/70 p-2 rounded border border-graphite space-y-0.5">
              <span className="text-[8px] text-ivory/40 block uppercase">Uptime Score</span>
              <span className="text-sm font-bold font-mono text-champagne">99.98%</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-graphite/60 text-[10px] text-ivory/60 font-mono">
            <span>PostgreSQL / RLS</span>
            <span className="text-champagne">Admin Portals</span>
          </div>
        </div>
      )
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'We understand your business goals, requirements, and project vision in-depth to align on the perfect solution.'
    },
    {
      num: '02',
      title: 'Plan & Design',
      desc: 'Creating target project strategy, architectural structure, and clean, customized UI/UX design directions.'
    },
    {
      num: '03',
      title: 'Develop & Test',
      desc: 'Building with premium tech stack, integrating required features, and performing responsive testing and speed optimization.'
    },
    {
      num: '04',
      title: 'Launch & Support',
      desc: 'Deploying the project live, offering one included free minor update, and continuing paid maintenance as requested.'
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-obsidian text-ivory">
      
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-graphite/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-graphite/40 via-obsidian to-obsidian pointer-events-none" />
        
        <motion.div
          className="max-w-5xl mx-auto text-center z-10 space-y-7"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3.5 py-1 bg-graphite/80 border border-champagne/30 text-champagne rounded-full text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-ping mr-1" />
            <span>Digital Solutions. Real Transformation.</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-display leading-[1.1] tracking-tight"
          >
            DRST Technologies
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-lg sm:text-xl font-light text-champagne/90 tracking-wide max-w-3xl mx-auto"
          >
            Modern Websites. Intelligent Automation. Distinct Brand Identities.
          </motion.p>

          <motion.p 
            variants={itemVariants} 
            className="text-sm sm:text-base text-ivory/60 max-w-2xl mx-auto leading-relaxed"
          >
            We engineer high-performance web systems, custom automation workflows, and tailored digital solutions 
            built specifically around real business requirements.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/start-project"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-obsidian bg-champagne border border-champagne rounded-sm transition-all duration-300 hover:bg-mutedgold hover:border-mutedgold shadow-lg shadow-champagne/10 hover:-translate-y-0.5"
            >
              START YOUR PROJECT
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-ivory bg-graphite/80 border border-graphite rounded-sm transition-all duration-300 hover:bg-graphite hover:border-champagne/40"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section — Visual-First Editorial Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-graphite/80">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-champagne/80">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
            Our Services
          </h2>
          <p className="text-sm text-ivory/60 leading-relaxed">
            From custom web systems to intelligent process automation — engineered for impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link
              key={service.num}
              href="/services"
              className="group relative overflow-hidden p-6 sm:p-8 bg-graphite/40 border border-graphite/80 rounded-xl transition-all duration-500 hover:border-champagne/50 hover:bg-graphite/70 hover:shadow-xl hover:shadow-champagne/5 hover:-translate-y-1.5 flex flex-col justify-between space-y-6"
            >
              {/* Visual Presentation Element */}
              <div className="w-full">
                {service.visual}
              </div>

              {/* Text & Content Block */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-champagne/70 bg-obsidian px-2.5 py-1 rounded border border-graphite">
                    {service.tag}
                  </span>
                  <span className="text-2xl font-bold font-display text-champagne/30 group-hover:text-champagne transition-colors duration-300">
                    {service.num}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-champagne group-hover:text-ivory transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-ivory/60 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-graphite/60 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-champagne/80 group-hover:text-champagne transition-colors duration-300">
                  Explore Service
                </span>
                <ArrowRight className="h-4 w-4 text-champagne transition-transform group-hover:translate-x-1.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Company Stats / Trust Metrics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-graphite/80" aria-label="Company Trust Metrics">
        <motion.div 
          className="bg-graphite/40 border border-graphite/80 rounded-xl overflow-hidden shadow-xl shadow-champagne/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { numericValue: 10, suffix: '+', label: 'Projects Delivered' },
              { numericValue: 5, suffix: '+', label: 'Business Solutions' },
              { numericValue: 100, suffix: '%', label: 'Client Focused' },
              { numericValue: 24, suffix: '/7', label: 'Communication Support' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 md:p-10 text-center flex flex-col justify-center items-center border-graphite/60 ${
                  idx % 2 === 0 ? 'border-r lg:border-r-0' : ''
                } ${idx < 2 ? 'border-b lg:border-b-0' : ''} ${
                  idx > 0 ? 'lg:border-l' : ''
                }`}
              >
                <AnimatedCounter
                  numericValue={stat.numericValue}
                  suffix={stat.suffix}
                  duration={1800}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-champagne tracking-tight"
                />
                <span className="text-xs sm:text-sm font-mono font-medium text-ivory/70 uppercase tracking-wider mt-2.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Process Section — Continuous Flowing / Spiral-Style Connector */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-champagne/80">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
            Our Process
          </h2>
          <p className="text-sm text-ivory/60 leading-relaxed">
            A continuous, transparent progression from concept discovery to live deployment.
          </p>
        </div>

        {/* Desktop Process — Continuous Flowing Wave Connector Linking 01 -> 02 -> 03 -> 04 */}
        <div className="hidden lg:block relative pb-4">
          {/* Continuous Flowing Curved Connector SVG */}
          <svg
            className="absolute top-[88px] left-0 w-full h-32 pointer-events-none z-0"
            viewBox="0 0 1200 120"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Background Glow Path */}
            <path
              d="M 150 60 C 275 60, 325 15, 450 15 C 575 15, 625 105, 750 105 C 875 105, 925 60, 1050 60"
              stroke="#D4AF6A"
              strokeWidth="4"
              strokeOpacity="0.15"
              strokeLinecap="round"
              fill="none"
            />
            {/* Foreground Animated Dashed Flowing Path */}
            <path
              d="M 150 60 C 275 60, 325 15, 450 15 C 575 15, 625 105, 750 105 C 875 105, 925 60, 1050 60"
              stroke="url(#processGradientFlow)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              className="animate-flow-dash"
              fill="none"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="processGradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AF6A" stopOpacity="0.4" />
                <stop offset="33%" stopColor="#D4AF6A" stopOpacity="0.9" />
                <stop offset="66%" stopColor="#D4AF6A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D4AF6A" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          {/* 4 Connected Process Cards */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="relative p-6 sm:p-7 bg-graphite/60 border border-graphite rounded-xl space-y-4 hover:border-champagne/50 hover:bg-graphite/80 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Node Top Indicator */}
                <div className="flex items-center justify-between pb-2 border-b border-graphite/60">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-champagne ring-4 ring-champagne/20 flex items-center justify-center text-[8px] font-bold text-obsidian" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-champagne">
                      Stage {step.num}
                    </span>
                  </div>
                  <span className="text-2xl font-bold font-display text-champagne/20">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-champagne">
                    {step.title}
                  </h3>
                  <p className="text-xs text-ivory/60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 text-[10px] font-mono text-champagne/50 uppercase">
                  {idx < steps.length - 1 ? `Proceeds to 0${idx + 2} →` : 'Production Ready ✔'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Process — Continuous Vertical Flowing Path */}
        <div className="lg:hidden relative">
          {/* Vertical Flowing Track */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-champagne/60 via-champagne/30 to-champagne/60 z-0" />
          
          <div className="space-y-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={step.num} className="flex gap-5">
                {/* Step Connector Node */}
                <div className="flex flex-col items-center shrink-0 pt-5">
                  <div className="w-4 h-4 rounded-full bg-champagne border-2 border-obsidian ring-4 ring-champagne/20 shadow-md shadow-champagne/30 flex items-center justify-center text-[7px] font-bold text-obsidian">
                    {idx + 1}
                  </div>
                </div>
                {/* Card */}
                <div className="flex-1 p-5 bg-graphite/60 border border-graphite rounded-xl space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-champagne/70 block">
                    Stage {step.num}
                  </span>
                  <h3 className="text-lg font-bold font-display text-champagne">{step.title}</h3>
                  <p className="text-xs text-ivory/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 bg-graphite/70 border-t border-graphite/80 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display">
            Ready to Build Your Project?
          </h2>
          <p className="text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Partner with us to build elegant, high-performing websites and custom automation.
            Get a tailored quotation based on your specific requirements.
          </p>
          <div className="pt-4">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-obsidian bg-champagne border border-champagne rounded-sm transition-all duration-300 hover:bg-mutedgold hover:border-mutedgold hover:-translate-y-0.5 shadow-lg shadow-champagne/10"
            >
              START YOUR PROJECT
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
