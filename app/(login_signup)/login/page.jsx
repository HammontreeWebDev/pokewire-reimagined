'use client'
import LogInForm from "@/app/ui/login/LoginForm";
import userIsLoggedIn from "@/app/utils/userIsLoggedIn";


export default function Login() {
    userIsLoggedIn();

    return (

        <LogInForm />

    )
}