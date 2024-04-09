'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function RouteList() {
    userAuthentication();

    return (
        <p>This is the RouteList!</p>
    )
}