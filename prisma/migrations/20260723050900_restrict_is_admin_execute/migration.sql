-- Revoke execute permissions on public.is_admin() function from PUBLIC and anon roles
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;

-- Grant execute permissions on public.is_admin() function to authenticated and service_role (admin) roles
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;
