-- Backfill the 10 seed rows to Amanda's account (the only user so far),
-- then require user_id and replace the anon-only public policies with
-- per-user policies for the authenticated role. The prior policies only
-- granted access `to anon`, which is why signed-in (authenticated-role)
-- requests were silently rejected by RLS.
update public.restaurant_entries
set user_id = '50af2343-5afe-4a5c-b28e-e8d4bc53828f'
where user_id is null;

alter table public.restaurant_entries
  alter column user_id set not null;

drop policy "Public read access" on public.restaurant_entries;
drop policy "Public insert access" on public.restaurant_entries;
drop policy "Public update access" on public.restaurant_entries;

create policy "Users can read own entries"
  on public.restaurant_entries for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own entries"
  on public.restaurant_entries for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own entries"
  on public.restaurant_entries for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own entries"
  on public.restaurant_entries for delete
  to authenticated
  using (auth.uid() = user_id);
