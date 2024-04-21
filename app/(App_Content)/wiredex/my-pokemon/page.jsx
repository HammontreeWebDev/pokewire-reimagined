'use client'
import userAuthentication from "@/app/utils/userAuthentication";

export default function MyPokemon() {

    userAuthentication();

    return (
        <>
            <p>My Pokemon page</p>
        </>

    )
}