'use client'

import SignUpForm from "@/app/ui/signup/SignUpForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function SignUp() {

    // ! redirect to dashboard if user is signed in
    const {data: session, status} = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            redirect('/dashboard');
        }
    }, [session, status]);

    return (
            <SignUpForm />
    )
}