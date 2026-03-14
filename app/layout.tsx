import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sayoshopping - Luxury Jewellery",
  description: "Elegant luxury jewellery brand. Find the perfect pieces for your perfect moments.",
  keywords: ["jewellery", "luxury", "sayoshopping", "earrings", "necklaces", "rings"],
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
