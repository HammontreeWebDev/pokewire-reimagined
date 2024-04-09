'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function UserHome() {
    userAuthentication();

    return (
        <p>This is the User Home Page!</p>
    )
}