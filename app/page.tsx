// import { createClient } from "@/lib/supabase/server";
// import { cookies } from "next/headers";
import { Keypad } from "@/components/keypad/Keypad";
import Header from "@/components/layouts/Header";

export default async function Home() {
  // const supabase = await createClient();
  // const { data: people } = await supabase.from("People").select();
  // console.log(people);

  return (
    <>
      <Header />
      <main className="mx-6 pb-24">
        <Keypad />
      </main>
    </>
  );
}
