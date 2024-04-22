'use client'
import { usePokemon } from "@/app/context/PokemonContext";
import { useSave } from "@/app/context/SaveContext";
import { useEffect, useState } from "react";
import localForage from "localforage";
import AudioPlayer from "@/app/ui/audio/AudioPlayer";
import Image from "next/image";
import Pagination from "@/app/ui/pagination/Pagination";
import { useSession } from "next-auth/react";
import { FolderPlusIcon } from "@heroicons/react/24/outline";


export default function DataDisplay() {

    // * Get user session information
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (session) {
            setUserName(session.user.name)
        }
        console.log('Client side Session:', session)
    }, [session]);

    // * name variables
    const MOVES_PER_PAGE = 5;

    const [selectedPokemon] = usePokemon();
    const {saveState, setSaveState} = useSave();
    const [data, setData] = useState(null);
    const [types, setTypes] = useState([]);
    const [baseExperience, setBaseExperience] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [latestCry, setLatestCry] = useState('');
    const [legacyCry, setLegacyCry] = useState('');
    const [mainPokemonPicture, setMainPokemonPicture] = useState('');
    const [legacyPokemonPicture, setLegacyPokemonPicture] = useState('');
    const [latestPokemonPicture, setLatestPokemonPicture] = useState('');

    // ! State Management for pagination in moves section
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMoves, setFilteredMoves] = useState([]);

    // ! declare but leave empty for now
    let genericURL;

    useEffect(() => {

        selectedPokemon
            ?
            genericURL = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.toLowerCase()}`
            :
            null;

        const fetchData = async () => {
            const cacheKey = `data-${selectedPokemon}`;
            try {
                const cachedData = await localForage.getItem(cacheKey);
                if (cachedData) {
                    // console.log("Using cached data for:", selectedPokemon);
                    setData(cachedData);
                } else if (selectedPokemon.length > 3) {
                    const response = await fetch(genericURL);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const freshData = await response.json();
                    await localForage.setItem(cacheKey, freshData);
                    setData(freshData);
                }
            } catch (error) {
                console.error("Failed to fetch or cache data:", error);
            }
        };
        fetchData();
    }, [selectedPokemon]);

    useEffect(() => {
        if (data) {
            console.log(data);

            // Process and update all the relevant states based on the new data
            // ! Height Calculations
            const totalFeet = data.height / 3.048; // originally in decimeters
            const feet = Math.floor(totalFeet);
            let inches = Math.ceil((totalFeet - feet) * 12);

            let updatedFeet = feet;
            let displayHeight = inches === 12 ? `${updatedFeet + 1} ft.` : `${updatedFeet} ft. ${inches} in.`;

            // ! Weight Calculations
            const totalPounds = data.weight / 4.536; // originally in hectograms
            const pounds = Math.floor(totalPounds);
            let ounces = Math.ceil((totalPounds - pounds) * 16);

            let updatedPounds = pounds;
            let displayWeight = ounces === 16 ? `${updatedPounds + 1} lbs.` : `${updatedPounds} lbs. ${ounces} oz.`;

            // ! Set States
            setLatestCry(data.cries.latest ?? '');
            setLegacyCry(data.cries.legacy ?? '');
            setBaseExperience(data.base_experience ?? 'This stat cannot be found!');
            setHeight(displayHeight ?? 'This stat cannot be found!');
            setWeight(displayWeight ?? 'This stat cannot be found');
            setMainPokemonPicture(
                data.sprites.other['official-artwork'].front_default
                ??
                data.sprites.front_default
            );
            setLatestPokemonPicture(
                data.sprites.other.dream_world.front_default
                ??
                data.sprites.front_default
            );
            setLegacyPokemonPicture(
                data.sprites.other.showdown.front_default
                ??
                data.sprites.front_default
            );

            // ! Process types if present
            const typeDetailsPromises = data.types ? data.types.map(async typeInfo => {
                const typeCacheKey = `type-${typeInfo.type.name}`;
                let typeData = await localForage.getItem(typeCacheKey);

                if (!typeData) {
                    const response = await fetch(typeInfo.type.url);
                    if (!response.ok) throw new Error(`Failed to fetch type data for ${typeInfo.type.name}`);
                    typeData = await response.json();
                    await localForage.setItem(typeCacheKey, typeData);
                }
                // else {
                //     console.log('using cached type data for', typeInfo.type.name);
                // }

                return {
                    name: typeInfo.type.name,
                    damageRelations: {
                        doubleDamageTo: typeData.damage_relations.double_damage_to.map(d => d.name),
                        doubleDamageFrom: typeData.damage_relations.double_damage_from.map(d => d.name),
                        halfDamageTo: typeData.damage_relations.half_damage_to.map(d => d.name),
                        halfDamageFrom: typeData.damage_relations.half_damage_from.map(d => d.name),
                        noDamageTo: typeData.damage_relations.no_damage_to.map(d => d.name),
                        noDamageFrom: typeData.damage_relations.no_damage_from.map(d => d.name),
                    }
                };
            }) : Promise.resolve([]);

            Promise.all(typeDetailsPromises).then(fetchedTypes => {
                setTypes(fetchedTypes.length ? fetchedTypes : [{
                    name: "No type data available"
                }]);
            });

            // ! Process abilities if present
            if (data.abilities) {
                const abilitiesPromises = data.abilities.map(async ability => {

                    const abilityCacheKey = `ability-${ability.ability.name}`;
                    let abilityData = await localForage.getItem(abilityCacheKey);

                    if (!abilityData) {
                        const abilityResponse = await fetch(ability.ability.url);
                        abilityData = await abilityResponse.json();
                        await localForage.setItem(abilityCacheKey, abilityData);
                    }
                    // else {
                    //     console.log('using cached ability data for', abilityCacheKey)
                    // }

                    const abilityEffectEntries = abilityData.effect_entries;
                    const englishEffectEntry = abilityEffectEntries.find(entry => entry.language.name === "en");
                    const englishEffect = englishEffectEntry ? englishEffectEntry.effect : 'No english description found!';

                    return {
                        ...ability,
                        name: ability.ability.name,
                        effect: englishEffect,
                    };
                });
                Promise.all(abilitiesPromises).then(setAbilities);
            } else {
                setAbilities([]);
            }

            // ! Process moves if available
            const moveDetailsPromises = data.moves ? data.moves.map(async moveInfo => {
                const moveCacheKey = `move-${moveInfo.move.name}`;
                let moveData = await localForage.getItem(moveCacheKey);

                if (!moveData) {
                    const response = await fetch(moveInfo.move.url);
                    if (!response.ok) {
                        console.error(`Failed to fetch data for move ${moveInfo.move.name}`);
                        return { name: moveInfo.move.name, error: "Failed to fetch data" };
                    }
                    moveData = await response.json();
                    await localForage.setItem(moveCacheKey, moveData);
                }

                return {
                    name: moveInfo.move.name || 'No Data Available',
                    accuracy: moveData.accuracy || 'No Data Available',
                    contest_normal_use_after: moveData.contest_combos && moveData.contest_combos.normal && moveData.contest_combos.normal.use_after ? moveData.contest_combos.normal.use_after.map(d => d.name).join(", ").replaceAll('-', ' ') : 'N/A',
                    contest_normal_use_before: moveData.contest_combos && moveData.contest_combos.normal && moveData.contest_combos.normal.use_before ? moveData.contest_combos.normal.use_before.map(d => d.name).join(", ").replaceAll('-', ' ') : 'N/A',
                    contest_super_use_after: moveData.contest_combos && moveData.contest_combos.super && moveData.contest_combos.super.use_after ? moveData.contest_combos.super.use_after.map(d => d.name).join(", ").replaceAll('-', ' ') : 'N/A',
                    contest_super_use_before: moveData.contest_combos && moveData.contest_combos.super && moveData.contest_combos.super.use_before ? moveData.contest_combos.super.use_before.map(d => d.name).join(", ").replaceAll('-', ' ') : 'N/A',
                    contest_type: moveData.contest_type && moveData.contest_type.name ? moveData.contest_type.name : 'N/A',
                    damage_class: moveData.damage_class && moveData.damage_class.name ? moveData.damage_class.name : 'N/A',
                    effect_chance: moveData.effect_chance || 'N/A',
                    effect_description: moveData.effect_entries.length > 0 && moveData.effect_entries[0].effect ? moveData.effect_entries[0].effect : 'No description available',
                    power: moveData.power || 'N/A',
                    pp: moveData.pp || 'N/A'
                };
            }) : Promise.resolve([]);

            Promise.all(moveDetailsPromises).then(fetchedMoves => {
                setMoves(fetchedMoves.length ? fetchedMoves : [{ name: "No move data available" }]);
            });

        }
    }, [data]);  // This useEffect depends on data

    // ! UseEffect for filtering logic
    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = moves.filter((move) => move.name.toLowerCase().includes(lowercasedFilter));

        setFilteredMoves(filteredData);
        setCurrentPage(1);
    }, [searchTerm, moves]);

    // ! Pagination logic
    const indexOfLastMove = currentPage * MOVES_PER_PAGE;
    const indexOfFirstMove = indexOfLastMove - MOVES_PER_PAGE;
    const currentMoves = filteredMoves.slice(indexOfFirstMove, indexOfLastMove);

    // !Save Pokemon Logic
    const handlePokemonSave = async () => {
        const pokemonData = {
            name: selectedPokemon,
            height: height,
            weight: weight,
            baseExperience: baseExperience.toString(),
            types: types.map(type => ({
                name: type.name,
                doubleDamageTo: type.damageRelations.doubleDamageTo,
                doubleDamageFrom: type.damageRelations.doubleDamageFrom,
                halfDamageTo: type.damageRelations.halfDamageTo,
                halfDamageFrom: type.damageRelations.halfDamageFrom,
                noDamageTo: type.damageRelations.noDamageTo,
                noDamageFrom: type.damageRelations.noDamageFrom,
            })),
            abilities: abilities.map(ability => ({
                name: ability.name,
                effect: ability.effect,
            })),
            moves: moves.map(move => ({
                name: move.name,
                accuracy: move.accuracy.toString(),
                power: move.power.toString(),
                pp: move.pp.toString(),
                effectChance: move.effect_chance.toString(),
                effectDescription: move.effect_description,
                damageClass: move.damage_class,
                contestType: move.contest_type,
                contestNormalUseBefore: move.contest_normal_use_before,
                contestNormalUseAfter: move.contest_normal_use_after,
                contestSuperUseBefore: move.contest_super_use_before,
                contestSuperUseAfter: move.contest_super_use_after,
            })),
            cries: [{
                latest: latestCry,
                legacy: legacyCry
            }],
            sprites: [{
                main: mainPokemonPicture,
                latest: latestPokemonPicture,
                legacy: legacyPokemonPicture
            }],
        };

        try {
            const response = await fetch('/api/savePokemon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({pokemonData}),
            });

            const result = await response.json();

            if (response.ok) {
                // TODO: custom alert
                console.log('Pokemon saved succesfully', result);
                alert(`${selectedPokemon} was saved successfully!`);
                setSaveState(currentSaveState => !currentSaveState);
            } else {
                // TODO: custom alert
                console.error('Failed to save pokemon:', result.error);
                alert(`${selectedPokemon} failed to save: ${result.error}`);
            }
        } catch (error) {
            console.error('Error saving pokemon:', error);
        }
    }

    return (
        <>
            {
                selectedPokemon
                    ?
                    <div className='bg-gradient-to-tl from-[var(--poke-blue)] to-[var(--poke-black)] p-10 mt-3 rounded antialiased w-3/4'>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-base font-bold leading-7 text-white">PokéFinder</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">Discover your favorite pokémon</p>
                        </div>
                        <div className="mt-6 border-t border-white/10">

                            {/* // ! Save Pokémon // */}
                            <div className="flex flex-col items-center justify-center">
                                <h3 className=" text-center font-bold text-white">
                                    Save
                                    <span className="text-poke-yellow">
                                        &nbsp;{selectedPokemon}&nbsp;
                                    </span>
                                    To {
                                        status === 'loading' ?
                                            <p> Loading . . . </p>
                                            :
                                            <span className="text-poke-yellow">
                                                &nbsp;{userName}
                                            </span>
                                    }'s Wiré<span className="text-poke-red">Dex</span>!
                                </h3>
                                <button
                                    className="text-poke-red bg-poke-white p-1 rounded-2xl my-3 border-2 border-black hover:border-white hover:bg-black hover:text-white hover:animate-spin"
                                    type="button"
                                    onClick={handlePokemonSave}
                                >
                                    <FolderPlusIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <dl className="divide-y divide-white/10">

                                {/* //! Pokémon Name */}
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-bold leading-6 text-white">Pokémon</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                        <div className="bg-poke-black p-3 rounded-2xl my-1 max-w-fit flex justify-center items-center">
                                            <div className="flex flex-col items-center">
                                                <h2 className="text-poke-yellow capitalize my-3 text-center text-2xl font-extrabold">{selectedPokemon}</h2>
                                                <Image
                                                    src={mainPokemonPicture}
                                                    alt={selectedPokemon}
                                                    width={300}
                                                    height={300}
                                                />
                                            </div>
                                        </div>
                                    </dd>
                                </div>

                                {/* //! Pokémon Types */}
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-bold leading-6 text-white"> Type(s)</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">

                                        {
                                            types.map((types, index) => (
                                                <div className="bg-poke-black p-3 rounded-2xl my-1" key={index}>
                                                    <h2 className="text-poke-yellow capitalize my-3 text-center border-b text-2xl font-extrabold">
                                                        {types.name}
                                                    </h2>

                                                    {/* //* double damage to */}
                                                    <div className="flex">
                                                        <h3 className="mr-1 text-poke-yellow font-bold">Double Damage To:</h3>
                                                        <p className="capitalize text-poke-white font-bold">
                                                            {
                                                                types.damageRelations.doubleDamageTo.length > 0
                                                                    ?
                                                                    types.damageRelations.doubleDamageTo.join(", ")
                                                                    :
                                                                    <span className="text-poke-red">None</span>
                                                            }
                                                        </p>
                                                    </div>

                                                    {/* //* double damage from */}
                                                    <div className="flex">
                                                        <h3 className="mr-1 text-poke-yellow font-bold">Double Damage From:</h3>
                                                        <p className="capitalize text-poke-white font-bold">
                                                            {
                                                                types.damageRelations.doubleDamageFrom.length > 0
                                                                    ?
                                                                    types.damageRelations.doubleDamageFrom.join(", ")
                                                                    :
                                                                    <span className="text-poke-red">None</span>
                                                            }
                                                        </p>
                                                    </div>

                                                    {/* //* half damage to */}
                                                    <div className="flex">
                                                        <h3 className="mr-1 text-poke-yellow font-bold">Half Damage To:</h3>
                                                        <p className="capitalize text-poke-white font-bold">
                                                            {
                                                                types.damageRelations.halfDamageTo.length > 0
                                                                    ?
                                                                    types.damageRelations.halfDamageTo.join(", ")
                                                                    :
                                                                    <span className="text-poke-red">None</span>
                                                            }
                                                        </p>
                                                    </div>

                                                    {/* //* half damage from */}
                                                    <div className="flex">
                                                        <h3 className="mr-1 text-poke-yellow font-bold">Half Damage From:</h3>
                                                        <p className="capitalize text-poke-white font-bold">
                                                            {
                                                                types.damageRelations.halfDamageFrom.length > 0
                                                                    ?
                                                                    types.damageRelations.halfDamageFrom.join(", ")
                                                                    :
                                                                    <span className="text-poke-red">None</span>
                                                            }
                                                        </p>
                                                    </div>

                                                    {/* //* no damage to */}
                                                    <div className="flex">
                                                        <h3 className="mr-1 text-poke-yellow font-bold">No Damage To:</h3>
                                                        <p className="capitalize text-poke-white font-bold">
                                                            {
                                                                types.damageRelations.noDamageTo.length > 0
                                                                    ?
                                                                    types.damageRelations.noDamageTo.join(", ")
                                                                    :
                                                                    <span className="text-poke-red">None</span>
                                                            }
                                                        </p>
                                                    </div>

                                                    {/* //* no damage from */}
                                                    <div className="flex">
                                                        <h3 className="mr-1 text-poke-yellow font-bold">No Damage From:</h3>
                                                        <p className="capitalize text-poke-white font-bold">
                                                            {
                                                                types.damageRelations.noDamageFrom.length > 0
                                                                    ?
                                                                    types.damageRelations.noDamageFrom.join(", ")
                                                                    :
                                                                    <span className="text-poke-red">None</span>
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </dd>
                                </div>

                                {/* //! Pokémon Latest cry */}
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-bold leading-6 text-white">{`Latest Cry`}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">

                                        {
                                            latestCry ?
                                                <AudioPlayer
                                                    imageURL={latestPokemonPicture}
                                                    imageAlt={selectedPokemon}
                                                    audioSrc={latestCry}
                                                />

                                                :

                                                <p className="text-poke-red bg-poke-black p-3 rounded-2xl">There is no latest cry available for {selectedPokemon}!</p>

                                        }
                                    </dd>
                                </div>

                                {/* //! Pokémon Legacy cry */}
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-bold leading-6 text-white">{`Legacy Cry`}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                        {
                                            legacyCry ?
                                                <AudioPlayer
                                                    imageURL={legacyPokemonPicture}
                                                    imageAlt={selectedPokemon}
                                                    audioSrc={legacyCry}
                                                />
                                                :
                                                <p className="text-poke-red bg-poke-black p-3 rounded-2xl">There is no legacy cry available for {selectedPokemon}!</p>
                                        }
                                    </dd>
                                </div>

                                {/* //! Pokémon Base Experience */}
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-bold leading-6 text-white">Base Experience</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                        <div className="bg-poke-black p-3 rounded-2xl my-1">
                                            <p className="text-poke-yellow font-bold">{baseExperience} EXP</p>
                                        </div>
                                    </dd>
                                </div>

                                {/* //! Pokémon Height */}
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-bold leading-6 text-white"> Average Height</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                        <div className="bg-poke-black p-3 rounded-2xl my-1">
                                            <p className="text-poke-yellow font-bold">
                                                {height}
                                            </p>
                                        </div>
                                    </dd>
                                </div>

                                {/* //! Pokémon Weight */}
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-bold leading-6 text-white">Average Weight</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                        <div className="bg-poke-black p-3 rounded-2xl my-1">
                                            <p className="text-poke-yellow font-bold">
                                                {weight}
                                            </p>
                                        </div>
                                    </dd>
                                </div>

                                {/* //! Pokémon Abilities */}
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-bold leading-6 text-white">Abilities</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                        {
                                            abilities.map((ability, index) => (
                                                <div className="bg-poke-black p-3 rounded-2xl my-1" key={index}>
                                                    <h2 className="text-poke-yellow capitalize my-3 text-center border-b text-2xl font-extrabold">
                                                        {ability.name.replace('-', ' ')}
                                                    </h2>
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
                                    <dt className="text-sm font-bold leading-6 text-white">{`${selectedPokemon}'s Moves`}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0 min-h-screen">
                                        <input
                                            type="text"
                                            placeholder="Search moves. . ."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="rounded-lg text-poke-red"
                                        />
                                        <Pagination
                                            currentPage={currentPage}
                                            totalCount={filteredMoves.length}
                                            pageSize={MOVES_PER_PAGE}
                                            onPageChange={page => setCurrentPage(page)}
                                        />
                                        {
                                            currentMoves.map((move, index) => (
                                                <div key={index} className="bg-poke-black p-3 rounded-2xl my-1">
                                                    <h2 className="text-poke-yellow capitalize my-3 py-3 text-center border-b text-2xl font-extrabold">
                                                        {move.name.replace('-', ' ')}
                                                    </h2>

                                                    {/* // ! Damage Class */}
                                                    <div className="text-poke-yellow font-bold">
                                                        Damage Class:&nbsp;
                                                        <span className="text-poke-white capitalize">{
                                                            move.damage_class
                                                        }</span>
                                                    </div>

                                                    {/* // ! Accuracy */}
                                                    <div className="text-poke-yellow font-bold">
                                                        Accuracy:&nbsp;
                                                        <span className="text-poke-white">{
                                                            Number.isInteger(move.accuracy) ?
                                                                `${move.accuracy}%`
                                                                :
                                                                move.accuracy
                                                        }</span>
                                                    </div>

                                                    {/* // ! Power */}
                                                    <div className="text-poke-yellow font-bold">
                                                        Power:&nbsp;
                                                        <span className="text-poke-white">{
                                                            move.power
                                                        }</span>
                                                    </div>

                                                    {/* // ! PP */}
                                                    <div className="text-poke-yellow font-bold">
                                                        PP:&nbsp;
                                                        <span className="text-poke-white">{
                                                            move.pp
                                                        }</span>
                                                    </div>

                                                    {/* // ! Effect Chance */}
                                                    <div className="text-poke-yellow font-bold">
                                                        Effect Chance:&nbsp;
                                                        <span className="text-poke-white">{
                                                            move.effect_chance
                                                        }</span>
                                                    </div>

                                                    {/* // ! Description */}
                                                    <div className="text-poke-yellow font-bold">
                                                        Description:&nbsp;
                                                        <span className="text-poke-white">{
                                                            move.effect_description
                                                        }</span>
                                                    </div>

                                                    {/* //! Contest Details */}
                                                    <h3 className="text-poke-blue capitalize my-3 py-3 text-center border-t text-2xl font-extrabold">
                                                        Contest Details
                                                    </h3>

                                                    {/* type */}

                                                    <p className="text-center font-bold text-poke-yellow">
                                                        Type:&nbsp;
                                                        <span className="capitalize text-poke-white">
                                                            {move.contest_type}
                                                        </span>
                                                    </p>

                                                    {/* Normal section */}
                                                    <div>
                                                        <h4 className="text-poke-yellow font-bold py-3 text-lg">
                                                            Normal Combos
                                                        </h4>
                                                        <p className="text-poke-blue font-bold">Use Before:&nbsp;
                                                            <span className="text-poke-white font-bold capitalize">
                                                                {move.contest_normal_use_before}
                                                            </span>
                                                        </p>
                                                        <p className="text-poke-blue font-bold">Use After:&nbsp;
                                                            <span className="text-poke-white font-bold capitalize">
                                                                {move.contest_normal_use_after}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    {/* Super section */}
                                                    <div>
                                                        <h4 className="text-poke-yellow font-bold py-3 text-lg">
                                                            Super Combos
                                                        </h4>
                                                        <p className="text-poke-blue font-bold">Use Before:&nbsp;
                                                            <span className="text-poke-white font-bold capitalize">
                                                                {move.contest_super_use_before}
                                                            </span>
                                                        </p>
                                                        <p className="text-poke-blue font-bold">Use After:&nbsp;
                                                            <span className="text-poke-white font-bold capitalize">
                                                                {move.contest_super_use_after}
                                                            </span>
                                                        </p>
                                                    </div>





                                                </div>
                                            ))
                                        }
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}
