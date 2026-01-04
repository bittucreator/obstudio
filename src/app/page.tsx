import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ClientsAndTestimonials from '@/components/ClientsAndTestimonials';
import PortfolioGrid from '@/components/PortfolioGrid';
import PortfolioSkeleton from '@/components/PortfolioSkeleton';
import Footer from '@/components/Footer';
import portfolioData from '@/data/portfolio.json';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ClientsAndTestimonials clients={portfolioData.clients} />
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioGrid items={portfolioData.items} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}