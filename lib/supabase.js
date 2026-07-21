import { createClient } from "@supabase/supabase-js";

// These come from .env.local (locally) and Vercel env settings (live site).
// Until they are set, `supabase` is null and the review section shows a
// friendly "coming soon" message instead of crashing.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
