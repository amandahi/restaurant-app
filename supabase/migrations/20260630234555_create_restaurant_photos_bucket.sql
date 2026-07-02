insert into storage.buckets (id, name, public)
values ('restaurant-photos', 'restaurant-photos', true)
on conflict (id) do nothing;

create policy "Public read photos"
  on storage.objects for select
  to anon
  using (bucket_id = 'restaurant-photos');

create policy "Public upload photos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'restaurant-photos');
