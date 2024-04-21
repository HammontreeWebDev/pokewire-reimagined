import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSave } from "@/app/context/SaveContext";
// TODO: trigger changes based on save state

export default function WireDexTitle() {
    const { data: session, status } = useSession();
    const [pokemons, setPokemons] = useState([]);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
    const { saveState } = useSave();

    // TODO: Style wiredex title - make pokemon count dynamically update - may be able to pull local storage selectedPokemon, store it in state and update it that way?

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('/api/getAllPokemon', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('failed to fetch pokemons');
                }
                const data = await response.json();
                setPokemons(data);

            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        };

        fetchPokemons();
    }, [session, saveState]);

    useEffect(() => {
        setNumberOfPokemon(pokemons.length);
    }, [pokemons]);

    return (
        <div className="my-3 flex antialiased">
            <div className="flex flex-col justify-center mx-3">
                <p className="text-poke-white">Pokémon Count:
                    <span className="ml-1 bg-poke-yellow px-1 rounded text-poke-blue font-bold">
                        {
                            status === 'loading'
                                ?
                                '. . . Loading'
                                :
                                numberOfPokemon
                        }
                    </span>
                </p>
            </div>
        </div>
    )
}
