'use client'
import userAuthentication from "@/app/utils/userAuthentication"

export default function Settings() {
    userAuthentication();

    return (
        <p>This is the Settings!</p>
    )
}