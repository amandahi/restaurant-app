# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Restaurant Journal — a personal, single-user-per-account app for logging restaurant visits (dishes, rating, tags, notes, a photo, and an optional GIF). React 19 + TypeScript + Vite frontend; Supabase for auth, database, storage, and edge functions.

## Commands

```bash
npm run dev        # Vite dev server (loads .env.local)
npm run build      # tsc -b (typecheck) then vite build — run this to typecheck
npm run lint       # oxlint (config in .oxlintrc.json)
npm run preview    # serve the production build locally
```

There is no test runner configured. `npm run build` is the typecheck gate.

### Supabase

```bash
supabase db push                 # apply pending migrations to the linked remote project
supabase functions deploy giphy-search   # deploy the edge function after editing it
```

Remote project ref is `vebxlonxwgppadowfdrd` (requires `supabase link --project-ref vebxlonxwgppadowfdrd` once per machine). Migrations live in `supabase/migrations/` and are timestamp-ordered.

## Architecture

### Data flow (one direction, layered)

Components/pages never touch Supabase directly for entry data. The path is:

```
pages/ + components/  →  hooks/  →  services/restaurantService.ts  →  lib/supabaseClient.ts  →  Supabase
```

- **`services/restaurantService.ts`** is the single gateway to the `restaurant_entries` table. It owns the mapping between the snake_case DB row (`RestaurantEntryRow`) and the camelCase domain type (`RestaurantEntry`) via `toEntry()`. When adding a column, update the SQL migration, `RestaurantEntryRow`, `toEntry()`, the insert in `create()`, and the `RestaurantEntry`/`NewRestaurantEntry` types in `types/restaurant.ts` together.
- **`hooks/`** wrap the service in React state: `useRestaurantEntries` (list/search with loading/error/refresh), `useRestaurantEntry` (single entry), `useEntryForm` (the entire add-entry form state, validation, photo upload, and submit). Prefer extending these hooks over calling the service from a component.
- **Exceptions that bypass the service** and use `supabaseClient` directly: photo uploads to Storage (`useEntryForm.ts` → `uploadPhoto`, bucket `restaurant-photos`), GIF search (`GifPicker.tsx` → `supabase.functions.invoke('giphy-search')`), and all auth (`lib/AuthContext.tsx`).

### Auth & routing

- `lib/AuthContext.tsx` provides `useAuth()` — email OTP / magic-link sign-in (`signInWithOtp`), session state, `signOut`. No passwords.
- `App.tsx` defines routes: `/login` is public; everything else is wrapped in `RequireAuth` (redirects to `/login`) inside `AppShell` (nav chrome). Pages: `FeedPage` (index), `AddEntryPage` (`/add`), `EntryDetailPage` (`/entry/:id`), `RecommendPage` (`/recommend`).

### Row-level security (important)

Entries are scoped per user. RLS policies grant access only to the `authenticated` role where `auth.uid() = user_id` (see `20260702190000_backfill_owner_and_scope_rls.sql`). `restaurantService.create()` must set `user_id` from `supabase.auth.getUser()` or the insert is rejected by RLS. Do not reintroduce `to anon` / public policies — signed-in requests use the `authenticated` role.

The `restaurant-photos` Storage bucket is deliberately asymmetric (`20260702190010_authenticated_photo_upload_policy.sql`): **insert** requires the `authenticated` role, but **read stays public** so `<img src>` can load photos without an auth header. `useEntryForm` relies on `getPublicUrl()` for this reason — don't lock down read access.

### GIF search edge function

`supabase/functions/giphy-search/index.ts` is a Deno edge function proxying the GIPHY search API. The `GIPHY_API_KEY` lives **only** as a Supabase Edge Function secret — never a `VITE_` env var, never sent to the browser. The client calls it via `supabase.functions.invoke('giphy-search', ...)`.

## Environment

Local dev reads `.env.local` (gitignored); `.env.example` documents the shape:

```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

Only these two `VITE_` vars are exposed to the frontend.

## Deployment

Three parts must stay in sync — **apply DB migrations before pushing code** so the live frontend never queries a missing schema. See `DEPLOYING.md`. `git push origin main` (remote `amandahi/restaurant-app`) triggers Vercel to auto-deploy to `https://claude-demo-theta.vercel.app`. `vercel.json` rewrites all routes to `/index.html` for client-side routing.
