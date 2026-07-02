# Deploying

This app has three moving parts that all need to stay in sync: GitHub, Supabase, and Vercel.
Always apply database migrations *before* pushing/deploying code, so the live frontend never
queries a schema that doesn't exist yet.

## 1. Apply pending Supabase migrations

```
supabase db push
```

(Requires `supabase link --project-ref vebxlonxwgppadowfdrd` once per machine.)

## 2. Push to GitHub

```
git push origin main
```

## 3. Vercel deploys automatically

Vercel's GitHub integration is connected to `amandahi/restaurant-app`, so the push in
step 2 alone triggers a production build and deploy to `https://claude-demo-theta.vercel.app`.
No manual step needed.

If you ever need to deploy without a new commit (e.g. a pure env var change), you can still
run `vercel --prod` manually from this directory.

## 4. Verify

- Check the deployed URL loads and the login screen (or feed, if already signed in) renders.
- Check `vercel env ls production` if anything behaves differently than local dev —
  `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must point at the `restaurant-app`
  Supabase project (`vebxlonxwgppadowfdrd`).
- The GIPHY key is never a Vercel env var — it only exists as a Supabase Edge Function
  secret (`GIPHY_API_KEY`), consumed by the `giphy-search` function.
