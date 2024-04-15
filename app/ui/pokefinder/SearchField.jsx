
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import pokeList from '@/app/utils/pokeList';
import Image from 'next/image';

const pokemonList = pokeList;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchField() {
    const [query, setQuery] = useState('')
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    const filteredPokemon = query.length >= 3
        ? pokemonList.filter((pokemon) =>
            pokemon.toLowerCase().startsWith(query.toLowerCase()))
        : [];

    return (
        <Combobox as="div" value={selectedPokemon} onChange={setSelectedPokemon}>
            <div className='flex flex-col items-center'>
                <Image 
                src={'/img/profile_settings/MyPokemonIcon.png'}
                alt={'pokeball'}
                width={100}
                height={100}
                />
                <Combobox.Label className="block font-medium p-2 text-poke-white">Search for a pokemon:</Combobox.Label>
            </div>
            <div className="relative mt-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(pokemon) => pokemon || ""}
                />

                {filteredPokemon.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPokemon.map((pokemon) => (
                            <Combobox.Option
                                key={pokemon}
                                value={pokemon}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={classNames('block truncate', selected && 'font-semibold')}>{pokemon}</span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}