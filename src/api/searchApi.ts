import { supabase } from "../lib/supabaseClient";

export const searchApi = async (query: string) => {
    if (!query || query.length < 2) return [];

    const { data: restaurants, error: rError } = await supabase
        .from("restaurants")
        .select("id, name")
        .ilike("name", `%${query}%`);

    const { data: foods, error: fError } = await supabase
        .from("foods")
        .select("id, name")
        .ilike("name", `%${query}%`);

    console.log("restaurants:", restaurants, rError);
    console.log("foods:", foods, fError);

    const r = (restaurants || []).map((x) => ({
        id: x.id,
        name: x.name,
        type: "restaurant",
    }));

    const f = (foods || []).map((x) => ({
        id: x.id,
        name: x.name,
        type: "food",
    }));

    return [...r, ...f];
};