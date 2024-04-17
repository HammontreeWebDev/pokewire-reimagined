'use client'
import { usePokemon } from "@/app/context/PokemonContext";
import { useEffect, useState } from "react";
import AudioPlayer from "@/app/ui/audio/AudioPlayer";
import Image from "next/image";

export default function DataDisplay() {

    const [selectedPokemon] = usePokemon();
    const [baseExperience, setBaseExperience] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [latestCry, setLatestCry] = useState('');
    const [legacyCry, setLegacyCry] = useState('');
    const [frontLatest, setFrontLatest] = useState('');
    const [frontLegacy, setFrontLegacy] = useState('');
    const [artworkShiny, setArtworkShiny] = useState('');
    const [artworkDefault, setArtworkDefault] = useState('');

    const genericURL = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.toLowerCase()}`;

    useEffect(() => {
        const fetchData = async () => {
            if (selectedPokemon.length > 3) {
                try {
                    const response = await fetch(genericURL);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();

                    // TODO: Clear Console log that views data output
                    console.log(data);
                    // console.log('Dreamworld:', data.sprites.other.dream_world.front_default)
                    // console.log('Other:', data.sprites.other.showdown.front_shiny)

                    // * update height to recognizable value - it is currently in decimeters
                    const totalFeet = data.height / 3.048;
                    const feet = Math.floor(totalFeet);
                    let inches = Math.ceil((totalFeet - feet) * 12);

                    let updatedFeet = feet;
                    let displayHeight;

                    if (inches === 12) {
                        updatedFeet += 1;
                        displayHeight = `${updatedFeet} ft.`;
                    } else {
                        displayHeight = `${updatedFeet} ft. ${inches} in.`;
                    }

                    //  ! Update states based on the response //
                    setArtworkShiny(data.sprites.other.showdown.front_shiny ?? data.sprites.other.dream_world.front_default);
                    setArtworkDefault(data.sprites.other.showdown.front_default ?? data.sprites.other.dream_world.front_default);
                    setLatestCry(data.cries.latest ?? '');
                    setFrontLatest(data.sprites.other.dream_world.front_default ?? data.sprites.front_shiny);
                    setLegacyCry(data.cries.legacy ?? '');
                    setFrontLegacy(data.sprites.front_default ?? data.sprites.back_default);
                    setBaseExperience(data.base_experience ?? 'This stat cannot be found!');
                    setHeight(displayHeight ?? 'This stat cannot be found!');
                    setWeight(data.weight ?? 'This stat cannot be found');

                    // ! Process Abilities and fetch other url
                    if (data.abilities) {
                        const abilitiesPromises = data.abilities.map(async ability => {
                            const abilityResponse = await fetch(ability.ability.url);
                            const abilityData = await abilityResponse.json();
                            const abilityEffectEntries = abilityData.effect_entries;

                            // Find effect entry in english
                            const englishEffectEntry = abilityEffectEntries.find(entry => entry.language.name === "en");
                            const englishEffect = englishEffectEntry ? englishEffectEntry.effect : 'No english description found!';


                            return {
                                ...ability,
                                // ability: { ...ability.ability, details: abilityData },
                                name: ability.ability.name,
                                details: abilityData,
                                effect: englishEffect,
                                isHidden: ability.is_hidden,
                                slot: ability.slot
                            };
                        });

                        const abilitiesDetails = await Promise.all(abilitiesPromises);
                        console.log('ability details: ', abilitiesDetails);
                        setAbilities(abilitiesDetails);
                    } else {
                        setAbilities([]);
                    }

                    // ! Process moves
                    setMoves(data.moves ? data.moves.map(move => ({
                        name: move.move.name,
                        url: move.url
                    })) : []);

                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            }
        };

        fetchData();
    }, [selectedPokemon]);


    return (
        <>
            <div className='bg-dark-blue p-10 mt-3 rounded antialiased'>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-white">PokéFinder</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">Discover your favorite pokémon</p>
                </div>
                <div className="mt-6 border-t border-white/10">
                    <dl className="divide-y divide-white/10">

                        {/* //! Pokémon Name */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Pokémon</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                <div className="bg-poke-black p-3 rounded-2xl my-1 max-w-fit flex justify-center items-center">
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={artworkShiny}
                                            alt={`${selectedPokemon}`}
                                            width={80}
                                            height={80}
                                        />
                                        <p className="font-bold text-poke-blue">Shiny</p>
                                    </div>
                                    <p className="text-poke-yellow mx-5 font-extrabold">{selectedPokemon}</p>
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={artworkDefault}
                                            alt={`${selectedPokemon}`}
                                            width={80}
                                            height={80}
                                        />
                                        <p className="font-bold text-poke-white">Default</p>
                                    </div>
                                </div>
                            </dd>
                        </div>

                        {/* //! Pokémon Latest cry */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">{`Latest Cry`}</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">

                                {
                                    latestCry ?
                                        <AudioPlayer
                                            imageURL={frontLatest}
                                            imageAlt={`${selectedPokemon}`}
                                            soundTitle={`${selectedPokemon}`}
                                            audioSrc={latestCry}
                                        />

                                        :

                                        <p className="text-poke-red bg-poke-black p-3 rounded-2xl">There is no latest cry available for {selectedPokemon}!</p>

                                }
                            </dd>
                        </div>

                        {/* //! Pokémon Legacy cry */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">{`Legacy Cry`}</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                {/* // TODO: need to make it so that only the current pokemons legacy cry shows - at the moment it is displaying prev pokemons legacy cry if there was not one found for current pokemon selected */}
                                {
                                    legacyCry ?
                                        <AudioPlayer
                                            imageURL={frontLegacy}
                                            imageAlt={`${selectedPokemon}`}
                                            soundTitle={`${selectedPokemon}`}
                                            audioSrc={legacyCry}
                                        />
                                        :
                                        <p className="text-poke-red bg-poke-black p-3 rounded-2xl">There is no legacy cry available for {selectedPokemon}!</p>
                                }
                            </dd>
                        </div>

                        {/* //! Pokémon Base Experience */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Base Experience</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                <div className="bg-poke-black p-3 rounded-2xl my-1">
                                    <p className="text-poke-yellow">{baseExperience}</p>
                                </div>
                            </dd>
                        </div>

                        {/* //! Pokémon Height */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white"> Average Height</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                <div className="bg-poke-black p-3 rounded-2xl my-1">
                                    <p className="text-poke-yellow">
                                        {height}
                                    </p>
                                </div>
                            </dd>
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
                                        <div className="bg-poke-black p-3 rounded-2xl my-1" key={index}>
                                            <p className="text-poke-yellow uppercase my-1">
                                                {ability.name}
                                            </p>
                                            <p className="text-poke-white">
                                                {ability.effect}
                                            </p>
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
