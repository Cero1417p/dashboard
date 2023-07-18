import { createClient } from "@supabase/supabase-js"

const url: string = (import.meta.env.VITE_SUPABASE_PROJECT_URL as string) || ""
const apiKey: string = (import.meta.env.VITE_SUPABASE_PROJECT_KEY as string) || ""

export const supabase = createClient(url, apiKey)
