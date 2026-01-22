import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service - Obstudio',
  description: 'Terms of Service for Obstudio design agency.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="pt-32 pb-16 px-6 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-12">Last updated: January 4, 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-medium mb-3">1. Services</h2>
              <p>
                Obstudio provides design services including but not limited to website design, 
                product design, and branding for startups and businesses. All services are 
                provided on a project basis with agreed-upon deliverables and timelines.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">2. Payment Terms</h2>
              <p>
                Payment terms are outlined in individual project proposals. Typically, a 50% 
                deposit is required before work begins, with the remaining balance due upon 
                project completion. All payments are non-refundable once work has commenced.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">3. Intellectual Property</h2>
              <p>
                Upon full payment, clients receive full ownership rights to all final 
                deliverables. Obstudio retains the right to showcase completed work in 
                portfolios and marketing materials unless otherwise agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">4. Revisions</h2>
              <p>
                Each project includes a specified number of revision rounds as outlined in 
                the project proposal. Additional revisions beyond the agreed scope may incur 
                extra charges.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">5. Client Responsibilities</h2>
              <p>
                Clients are responsible for providing necessary content, feedback, and 
                approvals in a timely manner. Delays in client response may affect project 
                timelines and delivery dates.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">6. Confidentiality</h2>
              <p>
                We treat all client information and project details as confidential. We will 
                not disclose sensitive business information to third parties without explicit 
                consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">7. Limitation of Liability</h2>
              <p>
                Obstudio&apos;s liability is limited to the total amount paid for services. We 
                are not liable for indirect, incidental, or consequential damages arising 
                from the use of our deliverables.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">8. Termination</h2>
              <p>
                Either party may terminate a project with written notice. Upon termination, 
                the client is responsible for payment of all work completed up to that point.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">9. Contact</h2>
              <p>
                For questions about these terms, please contact us at{' '}
                <a href="mailto:hello@obstudio.co" className="underline hover:opacity-70">
                  hello@obstudio.co
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
