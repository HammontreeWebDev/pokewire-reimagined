import Image from "next/image";
import LogInNav from "@/app/components/navbars/LogInNav";

export default function Home() {
  return (
    <>
    <header>
      <LogInNav />
    </header>

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <p>This is the home page</p>

    </main>
    </>
  );
}
