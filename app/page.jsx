'use client'
import LogInNav from "@/app/ui/navbars/LogInNav";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

  // ! redirect to dashboard if user is signed in
  const {data: session, status} = useSession();

  useEffect(() => {
      if (status === "authenticated") {
          redirect('/dashboard');
      }
  }, [session, status]);

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
