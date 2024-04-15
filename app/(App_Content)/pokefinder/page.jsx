'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import SearchField from "@/app/ui/pokefinder/SearchField";

export default function Pokefinder() {

    userAuthentication();

    return (
        <SearchField />
    )
}