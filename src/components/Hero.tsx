import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo Icon */}
        <div className="mb-4 flex justify-center">
          <Image 
            src="/favicon.svg" 
            alt="OB Studio" 
            width={80} 
            height={80}
            className="rounded-2xl"
          />
        </div>
        
        {/* Tagline */}
        <p className="text-gray-500 text-lg mb-1">Design & Dev studio</p>
        <h1 className="text-3xl md:text-4xl font-medium mb-4">
          Crafting products that feel inevitable .
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">
          We partner with startups to design and build beautiful websites, products,<br />
          and brands that stand out.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Link 
            href="mailto:hello@obstudio.co?subject=Get Started"
            className="text-xs bg-black text-white border border-black rounded-full px-4 py-2 hover:bg-gray-800 hover:border-gray-800 transition-colors"
          >
            GET STARTED
          </Link>
          <Link 
            href="https://cal.com/obstudio/30min"
            target="_blank"
            className="text-xs border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors"
          >
            BOOK A CALL
          </Link>
        </div>
      </div>
    </section>
  );
}
