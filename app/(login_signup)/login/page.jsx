'use client'
import LogInForm from "@/app/ui/login/LoginForm";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Login() {

    // ! redirect to dashboard if user is signed in
    const {data: session, status} = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            redirect('/dashboard');
        }
    }, [session, status]);

    return (

            <LogInForm />

    )
}