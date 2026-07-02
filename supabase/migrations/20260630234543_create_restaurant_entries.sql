create table public.restaurant_entries (
  id uuid primary key default gen_random_uuid(),
  restaurant_name text not null,
  visit_date date not null,
  dishes jsonb not null default '[]'::jsonb,
  rating smallint not null check (rating between 1 and 5),
  notes text,
  full_review text,
  tags text[] not null default '{}'::text[],
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

alter table public.restaurant_entries enable row level security;

-- No auth in this app yet: allow the anon role full access so the
-- frontend (which only uses the publishable key) can read and write.
create policy "Public read access"
  on public.restaurant_entries for select
  to anon
  using (true);

create policy "Public insert access"
  on public.restaurant_entries for insert
  to anon
  with check (true);

create policy "Public update access"
  on public.restaurant_entries for update
  to anon
  using (true)
  with check (true);

create index restaurant_entries_visit_date_idx on public.restaurant_entries (visit_date desc);
create index restaurant_entries_rating_idx on public.restaurant_entries (rating desc);
