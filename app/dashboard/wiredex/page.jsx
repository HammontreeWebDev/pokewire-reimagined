'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function WireDex() {

    // ! Checks whether user is authenticated

    const {data: session, status} = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect('/login');
        }
    }, [session, status]);

    return (
            <p>This is the WireDex!</p>
    )
}