import { Fragment, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import localforage from 'localforage';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RouteListDropDown() {
    const [pokemonData, setPokemonData] = useState([
        {
            name: "Choose A Pokémon!",
            sprites: [
                {
                    main: "../img/profile_settings/HelpIcon.png",
                },
            ],
        }
    ]);
    const [selected, setSelected] = useState(pokemonData[0]);
    const { data: session, status, update } = useSession();
    const [routeData, setRouteData] = useState([]);

    useEffect(() => {
        const fetchRouteData = async () => {
            const selectedPokemon = pokemonData.find(pokemon => pokemon.name === selected.name);

            localforage.setItem("selectedPokemon", selected.name);

            if (selected.name !== "Choose A Pokémon!" && selectedPokemon && selectedPokemon.routes === null) {
                const encounterData = `https://pokeapi.co/api/v2/pokemon/${selected.name.toLowerCase()}/encounters`;

                try {
                    const response = await fetch(encounterData);
                    if (!response.ok) {
                        throw new Error(`Failed to get route data for ${selected.name}`);
                    }
                    const data = await response.json();
                    setRouteData(data);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        fetchRouteData();
    }, [selected, pokemonData]);

    useEffect(() => {
        console.log('Route Data: ', routeData);
    }, [routeData]);

    useEffect(() => {
        const fetchSaveRouteData = async () => {
            if (routeData.length > 0) {
                const saveRouteData = {
                    routes: routeData,
                    name: selected.name,
                };

                try {
                    const saveResponse = await fetch('/api/updatePokemon', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(saveRouteData),
                    });

                    const result = await saveResponse.json();
                    if (!saveResponse.ok) {
                        throw new Error(result.error);
                    }

                    console.log('Updated Pokemon saved to database:', result);
                } catch (error) {
                    console.error('Error saving route data:', error);
                }
            } else {
                const noDataAvailable = {
                    routes: [
                        {
                            location_area: {
                                name: "This pokémon can't be encountered in the wild!"
                            }
                        }
                    ],
                    name: selected.name,
                };

                try {
                    const saveNoData = await fetch('/api/updatePokemon', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(noDataAvailable),
                    });

                    const noDataResult = await saveNoData.json();
                    if (!saveNoData.ok) {
                        throw new Error(result.error);
                    }

                    console.log('This pokemon is not able to be encountered in the wild:', noDataResult);
                } catch (error) {
                    console.error('Error saving route data:', error);
                }

            }
        }

        fetchSaveRouteData();
    }, [routeData]);

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
                    setPokemonData(data);
                }
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        };
        fetchPokemons();
    }, [status]);

    useEffect(() => {
        console.log("DATA: ", pokemonData);
    }, [pokemonData])

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Label>
                    <div className="relative mt-2">
                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                <img src={selected.sprites[0].main} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
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
                                        key={pokemon.id}
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
    )
}
