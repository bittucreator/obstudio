import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obstudio - Design Partner for Startups",
  description: "Design partner for startups. We create stunning websites, products, and branding.",
  keywords: ["design agency", "web design", "branding", "product design", "startup"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Obstudio - Design Partner for Startups",
    description: "Design partner for startups. We create stunning websites, products, and branding.",
    url: "https://obstudio.co",
    siteName: "Obstudio",
    images: [
      {
        url: "/OG.png",
        width: 1200,
        height: 630,
        alt: "Obstudio - Design Partner for Startups",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obstudio - Design Partner for Startups",
    description: "Design partner for startups. We create stunning websites, products, and branding.",
    images: ["/OG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
