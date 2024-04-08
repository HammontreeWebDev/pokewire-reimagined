import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function userAuthentication(){
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect('/not_allowed');
        }
    }, [session, status]);
}

export default userAuthentication;