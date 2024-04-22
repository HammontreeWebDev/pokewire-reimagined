import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function PokemonDisplay() {
    const { data: session, status } = useSession();
    const [firstPokemonName, setFirstPokemonName] = useState(null);
    const [firstPokemonPicture, setFirstPokemonPicture] = useState(null);
    const [allPokemonNames, setAllPokemonNames] = useState([]);
    const [allPokemonPictures, setAllPokemonPictures] = useState([]);



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

                if (data.length > 0) {

                    // * Set first pokemon:
                    setFirstPokemonName(data[0].name);
                    setFirstPokemonPicture(data[0].sprites[0].main);

                    // * Set all pokemon and exclude the first:
                    const remainingPokemon = data.slice(1);
                    setAllPokemonNames(remainingPokemon.map((name) => name.name))
                    setAllPokemonPictures(remainingPokemon.map((picture) => picture.sprites[0].main));
                }

            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        };

        fetchPokemons();
    }, [status]);

    return (
        <div className="bg-poke-black w-full">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-poke-white">
                        Wiré
                        <span className="text-poke-red">
                            Dex
                        </span></h2>
                    {
                        firstPokemonName !== null
                            ?
                            <a href="/wiredex/my-pokemon" className="hidden text-sm font-semibold text-poke-blue hover:text-[var(--poke-yellow)] sm:block">
                                Browse all pokémon
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                            : null
                    }
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                    {
                        status === "loading"
                            ?
                            <p className="text-poke-white anitmate-pulse"> . . . Loading</p>
                            :
                            <>
                                {/* // ! large picture */}
                                <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                                    {
                                        firstPokemonPicture !== null
                                            ?
                                            <img
                                                src={firstPokemonPicture}
                                                alt={firstPokemonName}
                                                className="object-cover object-center group-hover:opacity-75"
                                            />
                                            :
                                            null
                                    }
                                    <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                                    <div className="flex items-end p-6">
                                        <div>
                                            <h3 className="font-semibold text-white">
                                                <a href={`/wiredex/my-pokemon/${firstPokemonName}`}>
                                                    <span className="absolute inset-0" />
                                                    {
                                                        firstPokemonName !== null ?
                                                            firstPokemonName
                                                            :
                                                            'Add your pokémon in the pokéfinder!'
                                                    }
                                                </a>
                                            </h3>
                                            <p aria-hidden="true" className="mt-1 text-sm text-white">
                                                View Stats
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* // ! small picture */}
                                {
                                    allPokemonNames.length > 0
                                        ?
                                        allPokemonNames.map((name, index) => (
                                            <div
                                                className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full"
                                                key={index}
                                            >
                                                <img
                                                    // The src needs to map allPokemonPictures here. . . the order in each array already coresponds to each data type
                                                    src={allPokemonPictures[index]}
                                                    alt={name}
                                                    className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                                                />
                                                <div
                                                    aria-hidden="true"
                                                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                                                />
                                                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                                                    <div>
                                                        <h3 className="font-semibold text-white">
                                                            <a href={`/wiredex/my-pokemon/${name}`}>
                                                                <span className="absolute inset-0" />
                                                                {name}
                                                            </a>
                                                        </h3>
                                                        <p aria-hidden="true" className="mt-1 text-sm text-white">
                                                            View Stats
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        null
                                }
                            </>
                    }
                </div>

                <div className="mt-6 sm:hidden">
                    <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        Browse all categories
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
