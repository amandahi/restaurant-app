import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GIPHY_API_KEY = Deno.env.get("GIPHY_API_KEY");
const GIPHY_SEARCH_URL = "https://api.giphy.com/v1/gifs/search";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const { query, offset } = await req.json().catch(() => ({ query: "", offset: 0 }));

  if (!query || typeof query !== "string") {
    return new Response(JSON.stringify({ error: "query is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const giphyUrl = new URL(GIPHY_SEARCH_URL);
  giphyUrl.searchParams.set("api_key", GIPHY_API_KEY ?? "");
  giphyUrl.searchParams.set("q", query);
  giphyUrl.searchParams.set("limit", "24");
  giphyUrl.searchParams.set("offset", String(offset ?? 0));
  giphyUrl.searchParams.set("rating", "pg-13");

  const giphyRes = await fetch(giphyUrl);
  const giphyJson = await giphyRes.json();

  if (!giphyRes.ok) {
    return new Response(JSON.stringify({ error: giphyJson.meta?.msg ?? "GIPHY search failed" }), {
      status: giphyRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const data = (giphyJson.data ?? []).map((gif: Record<string, unknown>) => ({
    id: gif.id,
    title: gif.title,
    images: gif.images,
  }));

  return new Response(JSON.stringify({ data, pagination: giphyJson.pagination }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
