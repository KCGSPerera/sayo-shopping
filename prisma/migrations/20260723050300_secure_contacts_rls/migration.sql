-- Drop the overly permissive policy for contacts
DROP POLICY IF EXISTS "Allow admin all contacts for ALL" ON public.contacts;

-- Create secure write/read policy for contacts allowing only authenticated admins to query/modify them
CREATE POLICY "Allow admin write/read contacts"
ON public.contacts
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
