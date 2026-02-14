"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBookmarkButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteBookmark = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error.message);
    } else {
      // 🔥 Refresh server component
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <button
      onClick={deleteBookmark}
      disabled={loading}
      className="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
