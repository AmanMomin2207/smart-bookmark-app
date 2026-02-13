import AddBookmarkForm from "@/components/AddBookmarkForm";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function BookmarksPage() {
  const user = await getCurrentUser();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Bookmarks 🔖</h1>
        <LogoutButton />
      </div>

      <p className="mb-4 text-sm text-gray-600">
        Logged in as {user?.email}
      </p>

      <AddBookmarkForm />
    </main>
  );
}
