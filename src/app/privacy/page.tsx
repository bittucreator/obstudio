import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Obstudio',
  description: 'Privacy Policy for Obstudio design agency.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="pt-32 pb-16 px-6 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-12">Last updated: January 4, 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-medium mb-3">1. Information We Collect</h2>
              <p>
                We collect information you provide directly, including your name, email 
                address, company name, and project details when you contact us or engage 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Provide and improve our design services</li>
                <li>Communicate with you about projects and inquiries</li>
                <li>Send relevant updates about our services (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. 
                We may share information with trusted service providers who assist in our 
                operations, subject to confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or 
                destruction.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">5. Cookies</h2>
              <p>
                Our website may use cookies to enhance your browsing experience. You can 
                choose to disable cookies through your browser settings, though this may 
                affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible 
                for the privacy practices of these external sites and encourage you to 
                review their policies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of 
                any significant changes by posting the new policy on this page with an 
                updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-3">9. Contact Us</h2>
              <p>
                If you have questions about this privacy policy, please contact us at{' '}
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
