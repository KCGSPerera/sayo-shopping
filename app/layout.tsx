import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://sayoshopping.lk'), // Replace with actual domain when known
  title: {
    default: "Sayoshopping | Luxury Jewellery & Elegant Collections",
    template: "%s | Sayoshopping"
  },
  description: "Discover Sayoshopping's exquisite collection of luxury jewellery. From diamond solitaire rings to emerald necklaces, find the perfect piece for every occasion.",
  keywords: ["jewellery", "luxury jewellery Sri Lanka", "sayoshopping", "engagement rings", "necklaces", "earrings", "bridal jewellery"],
  authors: [{ name: "Sayoshopping" }],
  creator: "Sayoshopping",
  publisher: "Sayoshopping",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Sayoshopping | Luxury Jewellery",
    description: "Elegant luxury jewellery brand. Find the perfect pieces for your perfect moments.",
    url: 'https://sayoshopping.lk',
    siteName: 'Sayoshopping',
    images: [
      {
        url: '/assets/logo/sayo-shopping-logo.png',
        width: 800,
        height: 600,
        alt: 'Sayoshopping Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sayoshopping | Luxury Jewellery",
    description: "Elegant luxury jewellery brand. Find the perfect pieces for your perfect moments.",
    images: ['/assets/logo/sayo-shopping-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
