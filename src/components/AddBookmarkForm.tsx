"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AddBookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    if (error) {
      setError(error.message);
    } else {
      setTitle("");
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={addBookmark}
      className="mt-6 space-y-5 rounded-2xl bg-white p-5 sm:p-6 shadow-lg ring-1 ring-gray-200"
    >
      <h2 className="text-xl font-semibold">Add Bookmark</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Bookmark"}
      </button>
    </form>
  );
}
