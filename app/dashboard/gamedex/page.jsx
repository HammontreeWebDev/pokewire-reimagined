'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function GameDex() {
    userAuthentication();

    return (
        <p>This is the GameDex!</p>
    )
}