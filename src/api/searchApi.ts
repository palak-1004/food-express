import { supabase } from "../lib/supabaseClient";

export const searchApi = async (query: string) => {
    const { data, error } = await supabase
        .from("items")
        .select("*")
        .ilike("name", `%${query}%`);

    if (error) return [];
    return data;
};