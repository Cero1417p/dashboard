import { createClient } from "@supabase/supabase-js"

const url: string = (import.meta.env.VITE_SUPABASE_URL as string) || ""
const apiKey: string = (import.meta.env.VITE_SUPABASE_ANON_PUBLIC_API_KEY as string) || ""

export const supabase = createClient(url, apiKey)
