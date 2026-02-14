import AddBookmarkForm from "@/components/AddBookmarkForm";
import { getCurrentUser } from "@/lib/auth";
import { getUserBookmarks } from "@/lib/bookmarks";
import LogoutButton from "@/components/LogoutButton";

export default async function BookmarksPage() {
  const user = await getCurrentUser();
  const bookmarks = await getUserBookmarks();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Bookmarks 🔖</h1>
        <LogoutButton />
      </div>

      <p className="mb-6 text-sm text-gray-600">
        Logged in as {user?.email}
      </p>

      <AddBookmarkForm />

      <div className="mt-8 space-y-4">
        {bookmarks.length === 0 ? (
          <p className="text-gray-500">No bookmarks yet.</p>
        ) : (
          bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="rounded border p-4 shadow-sm"
            >
              <h3 className="font-semibold">{bookmark.title}</h3>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {bookmark.url}
              </a>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
