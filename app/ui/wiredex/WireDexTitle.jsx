import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSave } from "@/app/context/SaveContext";

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
        <div className="w-full flex justify-center border-b mb-3">
            <div className="my-3 py-3 flex justify-center antialiased rounded w-1/2 bg-gradient-to-br from-transparent to-[var(--poke-yellow)]">
                {/* // ! Pokémon Count */}
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

                {/* //! Favorite Pokémon */}
                <div className="flex flex-col justify-center mx-3">
                    <p className="text-poke-white">Favorite Pokémon:
                        <span className="ml-1 bg-poke-yellow px-1 rounded text-poke-blue font-bold">
                            Placeholder Pikachu
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}
