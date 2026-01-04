'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          OBSTUDIO.
        </Link>
        
        <nav className="flex items-center gap-4">
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
      </div>
    </header>
  );
}
