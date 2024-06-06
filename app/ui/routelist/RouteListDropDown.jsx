import { useState, useEffect } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RouteListDropDown({ pokemonData, selectedPokemon, setSelectedPokemon }) {
    const [selected, setSelected] = useState(pokemonData[0] || {});

    useEffect(() => {
        if (selected && selected.name) {
            const selectedPokemon = pokemonData.find(pokemon => pokemon.name === selected.name);
            if (selectedPokemon) {
                setSelectedPokemon(selectedPokemon);
            }
        }
    }, [selected, pokemonData, setSelectedPokemon]);

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Label>
                    <div className="relative mt-2">
                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                {selected.sprites && <img src={selected.sprites[0].main} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />}
                                <span className="ml-3 block truncate">{selected.name}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {pokemonData.map((pokemon) => (
                                    <ListboxOption
                                        key={pokemon.name}
                                        className={({ focus }) =>
                                            classNames(
                                                focus ? 'bg-indigo-600 text-white' : '',
                                                !focus ? 'text-gray-900' : '',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={pokemon}
                                    >
                                        {({ selected, focus }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <img src={pokemon.sprites[0].main} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {pokemon.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            focus ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}
