import LoggedInNav from "@/app/ui/navbars/LoggedInNav";


export default function Layout({ children }) {
    return (
        <>
            <header>
                <LoggedInNav />
            </header>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {children}
            </main>
        </>
    );
}