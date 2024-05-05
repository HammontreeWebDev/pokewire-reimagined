'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import MyPokemon from "@/app/ui/settings/MyPokemon";

export default function Pokemon() {
    userAuthentication();

    return (
                <MyPokemon />
    )
}