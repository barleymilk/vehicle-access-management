import { Keypad } from "@/components/keypad/Keypad";
import Header from "@/components/layouts/Header";

export default async function Home() {
  return (
    <>
      <Header />
      <main className="mx-6 pb-24">
        <Keypad />
      </main>
    </>
  );
}
