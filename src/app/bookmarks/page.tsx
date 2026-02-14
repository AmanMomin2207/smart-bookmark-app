import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { getCurrentUser } from "@/lib/auth";
import { getUserBookmarks } from "@/lib/bookmarks";
import LogoutButton from "@/components/LogoutButton";

export default async function BookmarksPage() {
  const user = await getCurrentUser();
  const bookmarks = await getUserBookmarks();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Bookmarks
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Save and manage your favorite links
          </p>
        </div>
        <LogoutButton />
      </div>

      <p className="mb-6 text-sm text-gray-600">
        Logged in as {user?.email}
      </p>

      <AddBookmarkForm />

      {/* 🔄 Realtime list */}
      <BookmarkList initialBookmarks={bookmarks} />
    </main>
  );
}
