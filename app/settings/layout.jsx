import SideNav from "@/app/ui/settings/SideNav";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen">
            <SideNav />
            <main className="flex-1 p-8 min-h-screen bg-gray-500 w-full">
                {children}
            </main>
        </div>
    );
}