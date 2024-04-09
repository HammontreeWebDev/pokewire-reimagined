'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import SideNav from "@/app/ui/settings/SideNav";

export default function SettingsPage() {
    userAuthentication();

    return (

        <div className="flex min-h-screen">
            <SideNav />
            <main className="flex-1 p-8">
                <p>this is the settings page</p>
            </main>
        </div>

    )
}