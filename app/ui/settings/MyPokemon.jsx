import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import typeColorSelector from '@/app/utils/typeColorSelector';

const people = [
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
]

export default function MyPokemon() {

    const { data: session, status } = useSession();
    const [pokemonData, setPokemonData] = useState([]);

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

                    // ! Debug
                    console.log(data);
                    // * Set all pokemon data:
                    setPokemonData(data);

                }

            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        };

        fetchPokemons();
    }, [status]);

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pokemonData?.map((pokemon) => (
                <li key={pokemon.name} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="truncate text-sm font-bold text-poke-black">{pokemon.name}</h3>
                                {pokemon.types.map((name) => (
                                    <span
                                        className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-1 text-xs font-bold text-white ring-1 ring-inset ${typeColorSelector(name)}`}
                                        key={name.name}
                                    >
                                        {name.name}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">Updated: {moment(pokemon.updatedAt).calendar()}</p>
                        </div>
                        <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={pokemon.sprites[0].main} alt="" />
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <a
                                    href={`mailto:${pokemon.email}`}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Email
                                </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <a
                                    href={`tel:${pokemon.telephone}`}
                                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Call
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
