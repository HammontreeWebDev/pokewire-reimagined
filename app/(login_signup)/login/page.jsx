'use client'
import LogInForm from "@/app/ui/login/LoginForm";
import { SessionProvider } from "next-auth/react";

export default function Login() {
    return (
        <SessionProvider>
            <LogInForm />
        </SessionProvider>
    )
}