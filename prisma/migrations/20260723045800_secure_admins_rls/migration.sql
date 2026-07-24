-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow admin all admins for ALL" ON public.admins;

-- Create helper function to check if the authenticated user is an admin without RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql;

-- Enable RLS on admins if not already enabled
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create new secure policy
CREATE POLICY "Allow read/write access to authenticated admins"
ON public.admins
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());
