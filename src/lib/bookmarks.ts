import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getUserBookmarks() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookmarks:", error.message);
    return [];
  }

  return data;
}
