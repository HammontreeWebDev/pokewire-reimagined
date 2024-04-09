'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function WireDex() {

    userAuthentication();

    return (
        <p>This is the WireDex!</p>
    )
}