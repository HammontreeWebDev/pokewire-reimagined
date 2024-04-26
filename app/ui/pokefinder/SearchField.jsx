
import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import pokeList from '@/app/utils/pokeList';
import Image from 'next/image';
import { usePokemon } from '@/app/context/PokemonContext';

const pokemonList = pokeList;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchField() {
    const [query, setQuery] = useState('')
    const [tempSelectedPokemon, setTempSelectedPokemon] = useState('');
    const [selectedPokemon, setSelectedPokemon] = usePokemon();

    const filteredPokemon = query.length >= 3
        ? pokemonList.filter((pokemon) =>
            pokemon.toLowerCase().startsWith(query.toLowerCase()))
        : [];

    // set value to local storage to be able to be used in other parts of the application. . .
    useEffect(() => {
        if (selectedPokemon) {
            localStorage.setItem('selectedPokemon', selectedPokemon);
        }
    }, [selectedPokemon]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSelectedPokemon(tempSelectedPokemon);
        setTempSelectedPokemon('');
    }

    return (
        <Combobox as="form" onSubmit={handleSubmit} value={tempSelectedPokemon} onChange={setTempSelectedPokemon} className="space-y-4 flex flex-col items-center">
            <div className='flex flex-col items-center'>
                <Combobox.Label className="block font-medium text-poke-white">Search for a pokemon:</Combobox.Label>
            </div>
            <div className="relative mt-2">
                <Combobox.Input
                    className="rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(pokemon) => pokemon || ""}
                    placeholder='Pikachu'
                />

                {filteredPokemon.length > 0 && (
                    <Combobox.Options className="w-full absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
            <button type='submit' className='mt-4 px-4 py-2 bg-dark-blue text-poke-white rounded shadow hover:bg-[var(--dark-yellow)] hover:text-[var(--poke-red)] hover:animate-pulse'>Submit</button>
        </Combobox>
    )
}