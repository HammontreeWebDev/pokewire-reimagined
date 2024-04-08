'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import NotAllowed from "@/app/ui/feedback/NotAllowed";

export default function Dashboard() {

    // ! Checks whether user is authenticated

    const {data: session, status} = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect('/not_allowed');
        }
    }, [session, status]);

    return (
            <p>This is the dashboard!</p>
    )
}