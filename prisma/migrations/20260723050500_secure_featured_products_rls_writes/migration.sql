-- Drop the overly permissive write policy for featured_products
DROP POLICY IF EXISTS "Allow write access for authenticated users to featured products" ON public.featured_products;

-- Create secure write policy for featured_products allowing only verified administrators to write/modify/delete
CREATE POLICY "Allow write access for authenticated admins to featured products"
ON public.featured_products
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
