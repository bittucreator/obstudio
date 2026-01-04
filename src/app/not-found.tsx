'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold tracking-tighter mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
