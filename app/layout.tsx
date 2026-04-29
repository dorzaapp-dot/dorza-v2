import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dorza — The AI agency for Sydney small business",
  description:
    "We build your website, run your social media, and get you found on Google. Done-for-you, live in 24 hours. From $199/month. No lock-in.",
  openGraph: {
    title: "Dorza",
    description:
      "We build your website, run your social media, and get you found on Google. Done-for-you, live in 24 hours.",
    url: "https://dorza.app",
    siteName: "dorza",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dorza",
    description:
      "AI-native digital agency for Sydney local businesses. Websites, social media, Google Business, and AI agents — done for you.",
    url: "https://dorza.app",
    areaServed: { "@type": "City", name: "Sydney" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@dorza.com.au",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
