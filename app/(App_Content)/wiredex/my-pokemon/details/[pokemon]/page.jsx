'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import Details from "@/app/ui/wiredex/Details";

export default function PokemonPage() {

    userAuthentication();

    return (
        <>
            <Details />
        </>

    )
}