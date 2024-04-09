'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function Pokemon() {
    userAuthentication();

    return (
                <p>This is the pokemon page</p>
    )
}