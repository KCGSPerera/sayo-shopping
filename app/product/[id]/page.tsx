import ProductClient from "./ProductClient";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  const { data: product } = await supabase
    .from('products')
    .select(`*, category:categories(name)`)
    .eq('id', id)
    .single();

  if (!product) {
    return {
      title: "Product Not Found | Sayoshopping",
    };
  }

  const { data: imgData } = await supabase
    .from('product_images')
    .select('image_url')
    .eq('product_id', id);

  const images = imgData && imgData.length > 0 ? imgData.map(img => img.image_url) : [];

  return {
    title: `${product.name} | Luxury Jewellery | Sayoshopping`,
    description: `Shop ${product.name} at Sayoshopping. ${product.description ? (Array.isArray(product.description) ? product.description[0] : product.description) : 'An elegant luxury jewellery piece crafted with precision.'}`,
    openGraph: {
      title: `${product.name} | Sayoshopping`,
      description: `Buy ${product.name} online. Elegant luxury jewellery.`,
      images: images.length > 0 ? [images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  // Fetch initial data to avoid hydration flickers
  const { data: product } = await supabase
    .from('products')
    .select(`*, category:categories(name)`)
    .eq('id', id)
    .single();

  const { data: imgData } = await supabase
    .from('product_images')
    .select('image_url')
    .eq('product_id', id);

  const images = imgData && imgData.length > 0 ? imgData.map(img => img.image_url) : [];

  return <ProductClient id={id} initialProduct={product} initialImages={images} />;
}
