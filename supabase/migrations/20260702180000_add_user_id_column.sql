-- Adds user ownership ahead of wiring up Supabase Auth. Left nullable
-- and existing public policies are untouched for now: the 10 seed rows
-- need to be backfilled to a real account (via magic-link sign-in)
-- before user_id can be made required and RLS tightened to per-user.
alter table public.restaurant_entries
  add column user_id uuid references auth.users(id) on delete cascade;

create index restaurant_entries_user_id_idx
  on public.restaurant_entries (user_id, visit_date desc);
