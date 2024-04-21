
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WireDexTitle() {
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        if (status === 'loading') {
            setUserName('. . . Loading');
        } else {
            setUserName(session.user.name);
        }
    }, [status])

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
    }, [session])

    return (
        <div className="my-3 flex antialiased">
            <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </span>
            <div className="flex flex-col justify-center mx-3">
                <h3 className="text-poke-white">
                    {
                        status === 'loading'
                            ?
                            '. . . Loading'
                            :
                            userName
                    }
                </h3>
                <p className="text-poke-white">Pokémon Count:
                    <span className="ml-1 bg-poke-yellow px-1 rounded text-poke-blue font-bold">
                        {
                            status === 'loading'
                                ?
                                '. . . Loading'
                                :
                                pokemons.length
                        }
                    </span>
                </p>
            </div>
        </div>
    )
}
