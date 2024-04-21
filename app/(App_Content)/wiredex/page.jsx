'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import PokemonDisplay from "@/app/ui/wiredex/PokemonDisplay";

export default function WireDex() {

    userAuthentication();

    return (
        <>
        <PokemonDisplay />
        </>

    )
}