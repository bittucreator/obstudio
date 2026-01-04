import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import portfolioData from '@/data/portfolio.json';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Testimonials - Obstudio',
  description: 'See what our clients say about working with Obstudio. Real feedback from startups we\'ve helped with design.',
  openGraph: {
    title: 'Testimonials - Obstudio',
    description: 'See what our clients say about working with Obstudio.',
    url: 'https://obstudio.co/testimonials',
    images: [{ url: '/OG.png', width: 1200, height: 630 }],
  },
};

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
}

export default function TestimonialsPage() {
  const testimonials: Testimonial[] = portfolioData.testimonials || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="pt-32 pb-16 px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs text-gray-400 tracking-wider mb-4">WALL OF LOVE</p>
            <h1 className="text-3xl md:text-4xl font-medium">
              What our clients say
            </h1>
          </div>

          {/* Testimonials Grid */}
          {testimonials.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No testimonials yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-gray-50 rounded-2xl p-6 flex flex-col"
                >
                  <blockquote className="text-gray-700 leading-relaxed mb-6 flex-1">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
