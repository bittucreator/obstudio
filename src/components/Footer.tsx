import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500">©2026 Obstudio</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link 
            href="https://x.com/obstudioco" 
            target="_blank"
            className="text-gray-500 hover:text-black transition-colors"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 fill-current"
              aria-label="X"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
