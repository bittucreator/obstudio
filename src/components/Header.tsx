'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          OBSTUDIO.
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link 
            href="/testimonials"
            className="text-xs hover:opacity-70 transition-opacity"
          >
            TESTIMONIALS
          </Link>
          <Link 
            href="https://cal.com/obstudio/30min" 
            target="_blank"
            className="text-xs hover:opacity-70 transition-opacity"
          >
            BOOK A CALL
          </Link>
          <Link 
            href="mailto:hello@obstudio.co"
            className="text-xs border border-black rounded-full px-3 py-1 hover:bg-black hover:text-white transition-colors"
          >
            MAIL ↗
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          <Link 
            href="/testimonials"
            className="text-sm hover:opacity-70 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          >
            TESTIMONIALS
          </Link>
          <Link 
            href="https://cal.com/obstudio/30min" 
            target="_blank"
            className="text-sm hover:opacity-70 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          >
            BOOK A CALL
          </Link>
          <Link 
            href="mailto:hello@obstudio.co"
            className="text-sm inline-block text-center border border-black rounded-full px-3 py-2 hover:bg-black hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            MAIL ↗
          </Link>
        </nav>
      )}
    </header>
  );
}
