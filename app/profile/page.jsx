'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import ProfileBase from "@/app/ui/profile/ProfileBase";

export default function Profile() {
    userAuthentication();

    return (
        <ProfileBase />
    )
}