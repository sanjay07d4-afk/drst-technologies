'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-obsidian/95 backdrop-blur-md border-b border-graphite/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] sm:h-[76px]">
          {/* Official DRST Logo — Constrained Container & Proportions */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center group py-2">
              <Image
                src="/logo.png"
                alt="DRST Technologies"
                width={170}
                height={52}
                priority
                className="h-[38px] sm:h-[46px] md:h-[50px] w-auto max-h-[52px] object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-semibold uppercase tracking-widest transition-colors duration-200 py-2 ${
                    active ? 'text-champagne font-bold' : 'text-ivory/70 hover:text-champagne'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-champagne rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-obsidian bg-champagne border border-champagne rounded-sm transition-all duration-300 hover:bg-mutedgold hover:border-mutedgold shadow-sm shadow-champagne/10 hover:-translate-y-0.5"
            >
              START YOUR PROJECT
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-champagne hover:text-ivory focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-obsidian/98 border-b border-graphite animate-fade-in" id="mobile-menu">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 ${
                    active ? 'text-champagne bg-graphite/60 font-bold border-l-2 border-champagne' : 'text-ivory/80 hover:text-champagne hover:bg-graphite/30'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link
                href="/start-project"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-5 py-3 text-xs font-bold uppercase tracking-widest text-obsidian bg-champagne rounded-sm hover:bg-mutedgold transition-all duration-300"
              >
                START YOUR PROJECT
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
