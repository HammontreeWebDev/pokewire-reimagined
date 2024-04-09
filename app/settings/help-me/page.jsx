'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function HelpMe() {
    userAuthentication();

    return (
                <p>This is the help page</p>
    )
}