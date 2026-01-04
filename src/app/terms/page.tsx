import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-semibold mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Services</h2>
            <p className="text-gray-600 mb-4">
              OB Studio provides design services including website design, product design, and branding. 
              Our pricing is as follows:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Up to 5 pages: $3,000</li>
              <li>Up to 10 pages: $5,000</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Payment</h2>
            <p className="text-gray-600 mb-4">
              A 50% deposit is required before work begins. The remaining balance is due upon project completion.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Revisions</h2>
            <p className="text-gray-600 mb-4">
              Each project includes up to 2 rounds of revisions. Additional revisions will be billed at our hourly rate.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Ownership</h2>
            <p className="text-gray-600 mb-4">
              Upon full payment, you will own all rights to the final deliverables. We reserve the right to 
              showcase the work in our portfolio.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Contact</h2>
            <p className="text-gray-600 mb-4">
              For questions about these terms, please contact us at{' '}
              <a href="mailto:hello@obstudio.co" className="text-black underline">
                hello@obstudio.co
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
