import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sayoshopping.lk';

  // Fetch all active products
  const { data: products } = await supabase
    .from('products')
    .select('id, updated_at')
    .eq('is_active', true);

  const productUrls = (products || []).map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: product.updated_at || new Promise((resolve) => resolve(new Date())),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/jewellery`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
  ];
}
