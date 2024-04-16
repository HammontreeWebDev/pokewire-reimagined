'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import SearchField from "@/app/ui/pokefinder/SearchField";
import DataDisplay from "@/app/ui/pokefinder/DataDisplay";
import { PokemonProvider } from "@/app/context/PokemonContext";

export default function Pokefinder() {

    userAuthentication();

    return (
        <PokemonProvider>
            <SearchField />
            <DataDisplay />
        </PokemonProvider>
    )
}