-- Same anon-only gap as restaurant_entries: signed-in uploads use the
-- authenticated role, which had no matching storage policy. Public read
-- stays so <img src> tags can load photos without an auth header.
create policy "Authenticated upload photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'restaurant-photos');
