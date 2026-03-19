import HomeClient from "./HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayoshopping | Luxury Jewellery Sri Lanka",
  description: "Experience the finest luxury jewellery in Sri Lanka at Sayoshopping. Browse our exclusive collection of diamond rings, emerald necklaces, and bridal sets.",
  openGraph: {
    title: "Sayoshopping | Exclusive Luxury Jewellery",
    description: "Browse, Buy, Bliss. Discover timeless elegance with Sayoshopping's curated jewellery collection.",
  }
};

export default function Home() {
  return <HomeClient />;
}
