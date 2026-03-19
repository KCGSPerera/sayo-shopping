import JewelleryClient from "./JewelleryClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Collection | Luxury Jewellery | Sayoshopping",
  description: "Browse the exclusive jewellery collection at Sayoshopping. From timeless classics to modern bridal exclusives, discover the perfect piece for you.",
  openGraph: {
    title: "Sayoshopping Jewellery Collection",
    description: "Discover our full collection of exquisite, hand-crafted jewellery.",
  }
};

export default function Jewellery() {
  return <JewelleryClient />;
}
