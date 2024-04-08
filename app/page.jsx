'use client'
import LogInNav from "@/app/ui/navbars/LogInNav";
import userIsLoggedIn from "@/app/utils/userIsLoggedIn";

export default function Home() {
  userIsLoggedIn();

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
