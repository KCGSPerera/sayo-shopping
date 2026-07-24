-- Drop the overly permissive policy for categories
DROP POLICY IF EXISTS "Allow admin all categories for ALL" ON public.categories;

-- Create secure write policy for categories allowing only authenticated admins to modify them
CREATE POLICY "Allow admin write categories"
ON public.categories
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
