import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

export default function PokemonDisplay() {
    const { data: session, status } = useSession();
    const [firstPokemonName, setFirstPokemonName] = useState(null);
    const [firstPokemonPicture, setFirstPokemonPicture] = useState(null);
    const [allPokemonNames, setAllPokemonNames] = useState([]);
    const [allPokemonPictures, setAllPokemonPictures] = useState([]);



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
        }
    }, [status]);

    return (
        <div className="bg-poke-black w-full min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <div className="flex flex-col items-center">
                        <Image
                            src={'/img/profile_settings/GettingStartedIcon.png'}
                            alt="premier ball"
                            width={50}
                            height={50}
                        />
                        <h2 className="text-2xl font-bold tracking-tight text-poke-white mt-3">
                            Wiré
                            <span className="text-poke-red">
                                Dex
                            </span></h2>
                    </div>

                    {
                        firstPokemonName !== null
                            ?
                            <Link href="/wiredex/my-pokemon" className="hidden text-sm font-semibold text-poke-blue hover:text-[var(--poke-yellow)] sm:block">
                                Browse all pokémon
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
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
                                {
                                    firstPokemonName !== null
                                        ?
                                        <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">

                                            <img
                                                src={firstPokemonPicture}
                                                alt={firstPokemonName}
                                                className="object-cover object-center group-hover:opacity-75"
                                            />

                                            <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                                            <div className="flex items-end p-6">
                                                <div>
                                                    <h3 className="font-semibold text-white">
                                                        <Link href={`/wiredex/my-pokemon/${firstPokemonName}`}>
                                                            <span className="absolute inset-0" />
                                                            {
                                                                firstPokemonName
                                                            }
                                                        </Link>
                                                    </h3>
                                                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                                                        View Stats
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <Link
                                            href={'/pokefinder'}
                                        >
                                            <span className="text-poke-white animate-pulse hover:border-b">
                                                Add Pokemon to your
                                                <span className="font-bold">&nbsp;Wire
                                                    <span className="text-poke-red">
                                                        Dex
                                                    </span></span>!
                                            </span>
                                        </Link>
                                }

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
                                                            <Link href={`/wiredex/my-pokemon/${name}`}>
                                                                <span className="absolute inset-0" />
                                                                {name}
                                                            </Link>
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
                    {
                        firstPokemonName !== null
                            ?
                            <Link href="/wiredex/my-pokemon" className="block text-sm font-semibold text-poke-blue hover:text-[var(--poke-yellow)]">
                                Browse all pokémon
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}
