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
      className="mt-4 inline-flex items-center rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-[0.97]"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
