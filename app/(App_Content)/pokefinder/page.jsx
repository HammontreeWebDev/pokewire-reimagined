'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function Pokefinder() {

    userAuthentication();

    return (
        <p>This is the dashboard!</p>
    )
}