import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

function userIsLoggedIn() {
    // ! redirect to dashboard if user is signed in
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            redirect('/dashboard');
        }
    }, [session, status]);
}

export default userIsLoggedIn;