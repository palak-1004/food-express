import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://igtbtgbjbakjokhxusdk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndGJ0Z2JqYmFram9raHh1c2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5OTgxNTEsImV4cCI6MjA5MTU3NDE1MX0.rEtZYnhwNtuf1YcVvgDBKkxYItyozuO7Sc_4AOfxgJQ";

export const supabase = createClient(supabaseUrl, supabaseKey);