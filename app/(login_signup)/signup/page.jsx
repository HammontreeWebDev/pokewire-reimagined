'use client'

import SignUpForm from "@/app/ui/signup/SignUpForm";
import userIsLoggedIn from "@/app/utils/userIsLoggedIn";

export default function SignUp() {
    userIsLoggedIn();

    return (
        <SignUpForm />
    )
}