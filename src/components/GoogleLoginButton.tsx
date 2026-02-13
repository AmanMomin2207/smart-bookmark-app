"use client";

import { supabase } from "@/lib/supabase/client";

export default function GoogleLoginButton() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: false, // 🔥 THIS IS THE KEY
      },
    });
  };

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      className="rounded-md bg-black px-4 py-2 text-white"
    >
      Sign in with Google
    </button>
  );
}
