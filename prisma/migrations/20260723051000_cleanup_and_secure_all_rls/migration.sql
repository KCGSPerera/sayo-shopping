-- 1. Drop the old insecure "Allow admin all *" policies using their correct database names
DROP POLICY IF EXISTS "Allow admin all admins" ON public.admins;
DROP POLICY IF EXISTS "Allow admin all categories" ON public.categories;
DROP POLICY IF EXISTS "Allow admin all orders" ON public.orders;
DROP POLICY IF EXISTS "Allow admin all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow admin all products" ON public.products;
DROP POLICY IF EXISTS "Allow admin all product_images" ON public.product_images;

-- 2. Secure products table by allowing only authenticated admins to modify products
DROP POLICY IF EXISTS "Allow admin write products" ON public.products;
CREATE POLICY "Allow admin write products"
ON public.products
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 3. Secure product_images table by allowing only authenticated admins to modify images
DROP POLICY IF EXISTS "Allow admin write product_images" ON public.product_images;
CREATE POLICY "Allow admin write product_images"
ON public.product_images
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
