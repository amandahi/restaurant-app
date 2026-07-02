-- Stores the attached GIPHY GIF as one flexible jsonb blob rather than
-- several flat columns, since GIPHY's response carries many nested
-- images.* renditions and this avoids repeated schema changes later.
alter table public.restaurant_entries
  add column gif jsonb;
