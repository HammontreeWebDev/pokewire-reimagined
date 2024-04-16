'use client'
import { usePokemon } from "@/app/context/PokemonContext";
import { useEffect, useState } from "react";

export default function DataDisplay() {

    const [selectedPokemon] = usePokemon();
    const [baseExperience, setBaseExperience] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [latestCry, setLatestCry] = useState('');
    const [legacyCry, setLegacyCry] = useState('');

    const genericURL = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.toLowerCase()}`;

    useEffect(() => {
        if (selectedPokemon.length > 3) {
            fetch(genericURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    setLatestCry(data.cries.latest);
                    setLegacyCry(data.cries.legacy);
                    setBaseExperience(data.base_experience);
                    setHeight(data.height);
                    setWeight(data.weight);

                    setAbilities(data.abilities.map(ability => ({
                        name: ability.ability.name,
                        isHidden: ability.is_hidden,
                        slot: ability.slot
                    })));

                    setMoves(data.moves.map(move => ({
                        name: move.move.name,
                        url: move.url
                    })));
                })
                .catch(error => console.error("Failed to fetch data:", error));
        }
    }, [selectedPokemon])


    return (
        <>
            <div className='bg-dark-blue p-10 mt-3 rounded'>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-white">PokéFinder</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">Discover your favorite pokémon</p>
                </div>
                <div className="mt-6 border-t border-white/10">
                    <dl className="divide-y divide-white/10">

                        {/* //! Pokémon Name */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Pokémon</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{selectedPokemon}</dd>
                        </div>

                        {/* //! Pokémon Latest cry */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">{`${selectedPokemon}'s Latest Cry`}</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                <audio src={latestCry} controls ></audio>
                            </dd>
                        </div>

                        {/* //! Pokémon Legacy cry */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">{`${selectedPokemon}'s Legacy Cry`}</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                {/* // TODO: need to make it so that only the current pokemons legacy cry shows - at the moment it is displaying prev pokemons legacy cry if there was not one found for current pokemon selected */}
                                <audio src={legacyCry} controls></audio>
                            </dd>
                        </div>

                        {/* //! Pokémon Base Experience */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Base Experience</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{baseExperience}</dd>
                        </div>

                        {/* //! Pokémon Height */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Height</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{height}</dd>
                        </div>

                        {/* //! Pokémon Weight */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Weight</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{weight}</dd>
                        </div>

                        {/* //! Pokémon Abilities */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Abilities</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                {
                                    abilities.map((ability, index) => (
                                        <div key={index}>
                                            {ability.name}
                                        </div>
                                    ))
                                }
                            </dd>
                        </div>

                        {/* //! Pokémon Moves */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Moves</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                {
                                    moves.map((move, index) => (
                                        <div key={index}>
                                            {move.name}
                                        </div>
                                    ))
                                }
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}
