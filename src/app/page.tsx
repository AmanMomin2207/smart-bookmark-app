import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="p-8">
      <pre>{JSON.stringify(data.user, null, 2)}</pre>
    </main>
  );
}
