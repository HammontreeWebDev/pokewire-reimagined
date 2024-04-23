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


    function toggleViewStats() {
        setIsOpen(!isOpen);
    }


    return (
        <>

            {
                isOpen
                    ?
                    <>
                        <div className="w-full flex justify-center items-center bg-dark-blue font-bold pb-3">
                            <button
                                className="text-poke-white hover:animate-pulse"
                                onClick={toggleViewStats}
                            >
                                Close
                            </button>
                        </div>
                        <div className="w-full flex justify-center border-b bg-dark-blue">

                            <div className="flex flex-col justify-center p-3 border mb-3 rounded bg-poke-black">
                                {/* // ! Pokémon Count */}

                                {
                                    status === 'loading'
                                        ?
                                        <div className="animate-pulse text-poke-red">. . . Loading</div>
                                        :
                                        <h1 className="text-poke-white text-center font-extrabold uppercase border-b mb-3">
                                            {userName}'s
                                            <span className="text-poke-red">
                                                &nbsp;Stats
                                            </span>
                                        </h1>
                                }

                                <p className="text-poke-yellow font-bold self-start">Pokémon Count:
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
                                <p className="text-poke-yellow font-bold self-start">Favorite Pokémon:
                                    <span className="ml-1 px-1 rounded text-poke-white">
                                        Placeholder Pikachu
                                    </span>
                                </p>
                            </div>
                        </div>
                    </>
                    :

                    <div className="w-full flex justify-center items-center bg-dark-blue font-bold border-b pb-3">
                        <button
                            className="text-poke-white hover:animate-pulse"
                            onClick={toggleViewStats}
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
