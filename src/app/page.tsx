import { getCurrentUser } from "@/lib/auth";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 text-center transition-all">

        {!user ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight">
              Smart Bookmark App 🔖
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Save and access your favorite links securely using Google login.
            </p>

            <div className="mt-8">
              <GoogleLoginButton />
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                {user.user_metadata?.full_name?.[0] ?? "U"}
              </div>

              <h1 className="text-2xl font-semibold">
                Welcome back 👋
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="/bookmarks"
                className="block w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Go to My Bookmarks
              </a>

              <LogoutButton />
            </div>
          </>
        )}

      </div>
    </main>
  );
}
