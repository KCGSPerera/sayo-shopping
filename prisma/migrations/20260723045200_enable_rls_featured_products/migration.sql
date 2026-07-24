-- Enable Row Level Security (RLS) on featured_products
ALTER TABLE public.featured_products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to featured_products for everyone (including anonymous users)
CREATE POLICY "Allow public read access to featured products" 
ON public.featured_products 
FOR SELECT 
TO public 
USING (true);

-- Allow authenticated users to perform all write operations (insert, update, delete)
CREATE POLICY "Allow write access for authenticated users to featured products" 
ON public.featured_products 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);
