import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { getCurrentUser } from "@/lib/auth";
import { getUserBookmarks } from "@/lib/bookmarks";
import LogoutButton from "@/components/LogoutButton";

export default async function BookmarksPage() {
  const user = await getCurrentUser();
  const bookmarks = await getUserBookmarks();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
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
      <BookmarkList initialBookmarks={bookmarks} 
        userId={user!.id}/>
    </main>
  );
}
