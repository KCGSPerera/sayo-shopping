-- 1. Create a private schema to hold internal functions (not exposed to PostgREST/Web API)
CREATE SCHEMA IF NOT EXISTS private;

-- 2. Define the is_admin() function inside the private schema
CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean 
SECURITY DEFINER
SET search_path = public, private
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql;

-- 3. Drop existing policies that reference the old public.is_admin() function
DROP POLICY IF EXISTS "Allow read/write access to authenticated admins" ON public.admins;
DROP POLICY IF EXISTS "Allow admin write categories" ON public.categories;
DROP POLICY IF EXISTS "Allow admin write/read contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow write access for authenticated admins to featured product" ON public.featured_products;
DROP POLICY IF EXISTS "Allow write access for authenticated admins to featured products" ON public.featured_products;
DROP POLICY IF EXISTS "Allow read/write access to authenticated admins for orders" ON public.orders;
DROP POLICY IF EXISTS "Allow admin write products" ON public.products;
DROP POLICY IF EXISTS "Allow admin write product_images" ON public.product_images;

-- 4. Re-create the secure policies using the hidden private.is_admin() helper
CREATE POLICY "Allow read/write access to authenticated admins"
ON public.admins
FOR ALL
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

CREATE POLICY "Allow admin write categories"
ON public.categories
FOR ALL
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

CREATE POLICY "Allow admin write/read contacts"
ON public.contacts
FOR ALL
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

CREATE POLICY "Allow write access for authenticated admins to featured product"
ON public.featured_products
FOR ALL
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

CREATE POLICY "Allow read/write access to authenticated admins for orders"
ON public.orders
FOR ALL
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

CREATE POLICY "Allow admin write products"
ON public.products
FOR ALL
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

CREATE POLICY "Allow admin write product_images"
ON public.product_images
FOR ALL
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

-- 5. Drop the old exposed function from the public schema
DROP FUNCTION IF EXISTS public.is_admin();
