import Header from "@/components/layouts/Header";
import { Keypad } from "@/components/keypad/Keypad";

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <main>
          <Keypad />
        </main>
      </div>
    </>
  );
}
