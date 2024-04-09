'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import GettingStarted from "@/app/ui/settings/GettingStarted";

export default function SettingsPage() {
    userAuthentication();

    return (
                <GettingStarted />
    )
}