'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import PokemonDisplay from "@/app/ui/wiredex/PokemonDisplay";
import WireDexTitle from "@/app/ui/wiredex/WireDexTitle";

export default function WireDex() {

    userAuthentication();

    return (
        <>
        <WireDexTitle />
        <PokemonDisplay />
        </>

    )
}