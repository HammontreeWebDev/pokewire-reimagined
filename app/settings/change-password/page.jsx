'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function SettingsPage() {
    userAuthentication();

    return (
                <p>This is the change password page</p>
    )
}