"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import DeleteBookmarkButton from "./DeleteBookmarkButton";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

export default function BookmarkList({
  initialBookmarks,
}: {
  initialBookmarks: Bookmark[];
}) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  // 🔄 Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        async () => {
          // Refetch bookmarks on any change
          const { data } = await supabase
            .from("bookmarks")
            .select("*")
            .order("created_at", { ascending: false });

          if (data) {
            setBookmarks(data);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (bookmarks.length === 0) {
    return <p className="text-gray-500 mt-6">No bookmarks yet.</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="group rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition hover:shadow-xl"
        >
          <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">{bookmark.title}</h3>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm text-gray-500 hover:text-blue-600 transition"
          >
            {bookmark.url}
          </a>

          <DeleteBookmarkButton id={bookmark.id} />
        </div>
      ))}
    </div>
  );
}
