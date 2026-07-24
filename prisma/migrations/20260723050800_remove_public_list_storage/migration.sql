-- Drop the Public Access SELECT policy on storage.objects that allows listing bucket contents
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
