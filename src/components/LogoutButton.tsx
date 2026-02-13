"use client";

import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <button
      onClick={logout}
      className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}
