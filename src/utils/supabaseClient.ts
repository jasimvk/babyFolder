import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ymfitwqmmtseeumwbpyr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  throw new Error("Missing Supabase anon key");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);