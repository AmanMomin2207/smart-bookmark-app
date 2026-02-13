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
      className="w-full max-w-md space-y-4 rounded-lg border p-4"
    >
      <h2 className="text-xl font-semibold">Add Bookmark</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full rounded border px-3 py-2"
      />

      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full rounded border px-3 py-2"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Bookmark"}
      </button>
    </form>
  );
}
