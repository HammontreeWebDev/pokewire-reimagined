'use client'
import LoggedInNav from "@/app/ui/navbars/LoggedInNav";
import UserStats from "@/app/ui/wiredex/UserStats";
import FooterLoggedIn from "../ui/footer/FooterLoggedIn";


export default function Layout({ children }) {
    return (
        <>
            <header>
                <LoggedInNav />
            </header>
            <main className="flex min-h-screen flex-col items-center bg-poke-black">
                    <UserStats />
                {children}
            </main>
            <FooterLoggedIn />
        </>
    );
}