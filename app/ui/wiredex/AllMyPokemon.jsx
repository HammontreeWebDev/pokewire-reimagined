import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function AllMyPokemon() {
    const { data: session, status } = useSession();
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
                    // * Set all pokemon:
                    setAllPokemonNames(data.map((name) => name.name))
                    setAllPokemonPictures(data.map((picture) => picture.sprites[0].main));
                }

            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        };

        fetchPokemons();
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
                        allPokemonNames.length > 0
                            ?
                            <Link href="/wiredex" className="hidden text-sm font-semibold text-poke-blue hover:text-[var(--poke-yellow)] sm:block">
                                <span aria-hidden="true"> &larr;</span>
                                &nbsp;Back
                            </Link>
                            : null
                    }
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                    {
                        status === "loading"
                            ?
                            <p className="text-poke-white anitmate-pulse"> . . . Loading</p>
                            :
                            <>
                                {/* // ! Map all pokemon */}
                                {
                                    allPokemonNames.length > 0
                                        ?

                                        allPokemonNames.map((name, index) => (
                                            <div
                                                className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2"
                                                key={`${name}-${index}`}
                                            >

                                                <img
                                                    src={allPokemonPictures[index]}
                                                    alt={name}
                                                    className="object-cover object-center group-hover:opacity-75"
                                                />

                                                <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                                                <div className="flex items-end p-6">
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
                    <Link href="/wiredex" className="block text-sm font-semibold text-poke-blue hover:text-[var(--poke-yellow)]">
                        <span aria-hidden="true"> &larr;</span>
                                &nbsp;Back
                    </Link>
                </div>
            </div>
        </div>
    )
}
