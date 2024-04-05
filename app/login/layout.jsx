import BasicNav from "../components/navbars/BasicNav";

export default function Layout({ children }) {
    return (
        <>
            <header>
                <BasicNav />
            </header>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {children}
            </main>
        </>
    );
}