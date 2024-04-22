'use client'
import LoggedInNav from "@/app/ui/navbars/LoggedInNav";
import WireDexTitle from "@/app/ui/wiredex/WireDexTitle";
import FooterLoggedIn from "../ui/footer/FooterLoggedIn";


export default function Layout({ children }) {
    return (
        <>
            <header>
                <LoggedInNav />
            </header>
            <main className="flex min-h-screen flex-col items-center justify-between">
                    <WireDexTitle />
                {children}
            </main>
            <FooterLoggedIn />
        </>
    );
}