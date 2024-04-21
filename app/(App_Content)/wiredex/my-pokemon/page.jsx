'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import AllMyPokemon from "@/app/ui/wiredex/AllMyPokemon";

export default function MyPokemon() {

    userAuthentication();

    return (
        <>
            <AllMyPokemon />
        </>

    )
}