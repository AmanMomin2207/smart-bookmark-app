import { getCurrentUser } from "@/lib/auth";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen items-center justify-center">
      {!user ? (
        <GoogleLoginButton />
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Welcome, {user.user_metadata?.full_name ?? "User"} 👋
          </h1>
          <p className="mt-2 text-gray-600">{user.email}</p>
          <LogoutButton />
        </div>
      )}
    </main>
  );
}
