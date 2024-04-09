'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import LoggedInNav from "../../ui/navbars/LoggedInNav";


export default function Profile() {
    userAuthentication();

    return (
        <p>Profile Page</p>
    )
}