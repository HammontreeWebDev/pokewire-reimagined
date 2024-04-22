import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSave } from "@/app/context/SaveContext";

export default function UserStats() {
    const { data: session, status } = useSession();
    const [pokemons, setPokemons] = useState([]);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
    const { saveState } = useSave();
    const [userName, setUserName] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
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
        }
    }, [status, saveState]);

    useEffect(() => {
        setNumberOfPokemon(pokemons.length);
    }, [pokemons]);

    useEffect(() => {
        // setUserName(session.user.name);
        if (status === 'authenticated') {
            setUserName(session.user.name);
        }
    }, [status === 'authenticated']);


    function handleViewStats() {
        setIsOpen(!isOpen);
    }


    return (
        <>

            {
                isOpen
                    ?
                    <>
                        <div className="w-full flex justify-center items-center bg-poke-black font-bold">
                            <button
                                className="text-poke-white hover:animate-pulse"
                                onClick={handleViewStats}
                            >
                                Close
                            </button>
                        </div>
                        <div className="w-full flex justify-center border-b bg-gradient-to-br from-transparent to-[var(--poke-yellow)]">
                            <div className="flex justify-center antialiased">

                                <div className="flex flex-col justify-center bg-trans-black p-3 w-screen">
                                    {/* // ! Pokémon Count */}

                                    {
                                        status === 'loading'
                                            ?
                                            <div className="animate-pulse text-poke-red">. . . Loading</div>
                                            :
                                            <h1 className="text-poke-white text-center border-b font-extrabold uppercase">
                                                {userName}'s
                                                <span className="text-poke-red">
                                                    &nbsp;Stats
                                                </span>
                                            </h1>
                                    }

                                    <p className="text-poke-yellow font-bold self-center">Pokémon Count:
                                        <span className="ml-1 px-1 rounded text-poke-white">
                                            {
                                                status === 'loading'
                                                    ?
                                                    '. . . Loading'
                                                    :
                                                    numberOfPokemon
                                            }
                                        </span>
                                    </p>

                                    {/* //! Favorite Pokémon */}
                                    <p className="text-poke-yellow font-bold self-center">Favorite Pokémon:
                                        <span className="ml-1 px-1 rounded text-poke-white">
                                            Placeholder Pikachu
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                    :

                    <div className="w-full flex justify-center items-center bg-poke-black font-bold">
                        <button
                            className="text-poke-white hover:animate-pulse"
                            onClick={handleViewStats}
                        >
                            View My
                            <span className="text-poke-red">
                                &nbsp;Stats
                            </span>
                        </button>
                    </div>
            }

        </>
    )
}
