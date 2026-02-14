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
        (payload) => {

            console.log("Realtime payload:", payload);

            
            const { eventType, new: newRow, old: oldRow } = payload;

            if (eventType === "INSERT") {
            setBookmarks((prev) => [newRow as Bookmark, ...prev]);
            }

            if (eventType === "DELETE") {
            setBookmarks((prev) =>
                prev.filter((b) => b.id !== (oldRow as Bookmark).id)
            );
            }

            if (eventType === "UPDATE") {
            setBookmarks((prev) =>
                prev.map((b) =>
                b.id === (newRow as Bookmark).id ? (newRow as Bookmark) : b
                )
            );
            }
        }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
    }, []);


    if (bookmarks.length === 0) {
        return (
            <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-10 text-center">
            <p className="text-gray-500">
                No bookmarks yet.
            </p>
            <p className="mt-2 text-sm text-gray-400">
                Add your first bookmark above 👆
            </p>
            </div>
        );
    }


  return (
    <div className="mt-8 space-y-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="group rounded-2xl bg-white p-4 sm:p-5 shadow-md ring-1 ring-gray-200 transition hover:shadow-xl"
        >
          <h3 className="text-base sm:text-lg font-semibold group-hover:text-blue-600 transition">{bookmark.title}</h3>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block wrap-break-word text-sm text-gray-500 hover:text-blue-600 transition"
          >
            {bookmark.url}
          </a>

          <DeleteBookmarkButton id={bookmark.id} />
        </div>
      ))}
    </div>
  );
}
