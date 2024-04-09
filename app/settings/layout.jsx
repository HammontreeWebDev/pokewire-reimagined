import SideNav from "@/app/ui/settings/SideNav";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen">
            <SideNav />
            <main className="flex-2 p-8 min-h-screen bg-gray-500">
                {children}
            </main>
        </div>
    );
}