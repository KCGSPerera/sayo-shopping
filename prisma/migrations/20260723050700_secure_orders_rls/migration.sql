-- Drop the overly permissive policy for orders
DROP POLICY IF EXISTS "Allow admin all orders for ALL" ON public.orders;

-- Create secure write/read policy for orders allowing only authenticated admins to query/modify them
CREATE POLICY "Allow read/write access to authenticated admins for orders"
ON public.orders
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
