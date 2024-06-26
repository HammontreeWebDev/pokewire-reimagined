import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import typeColorSelector from "@/app/utils/typeColorSelector";
import { ArrowsPointingOut, XMarkIcon } from "../svg/svgImagesHelper";

// TODO: Add functionality to either show all moves or user's 4 favorite moves for specific pokemon

export default function Details() {
    const { data: session, status } = useSession();
    const { pokemon } = useParams();
    const [pokemonData, setPokemonData] = useState();

    // ! define states for individual pokemon data
    const [mainPicture, setMainPicture] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [types, setTypes] = useState([]);
    const [baseExperience, setBaseExperience] = useState(null);
    const [isOpen, setIsOpen] = useState({});

    useEffect(() => {
        async function fetchPokemon() {

            const response = await fetch(`/api/getOnePokemon/${pokemon}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Pokemon');
            }
            const data = await response.json();
            // console.log(data);

            if (pokemonData === undefined) {
                setPokemonData(data);
                return;
            }
        }

        fetchPokemon();
    }, [])

    useEffect(() => {

        if (pokemonData !== undefined) {
            console.log(pokemonData);

            // ! set individual pokemon data:
            setMainPicture(pokemonData.sprites[0].main);
            setHeight(pokemonData.height);
            setWeight(pokemonData.weight);
            setTypes(pokemonData.types.map(type => ({
                name: type.name,

                doubleDamageTo: type.doubleDamageTo,

                doubleDamageFrom: type.doubleDamageFrom,

                halfDamageTo: type.halfDamageTo,

                halfDamageFrom: type.halfDamageFrom,

                noDamageTo: type.noDamageTo,

                noDamageFrom: type.noDamageFrom,

            })));
            setBaseExperience(`${pokemonData.baseExperience} EXP`);
        }

    }, [pokemonData !== undefined]);

    const toggleIsOpen = (index) => {
        setIsOpen(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="bg-poke-black w-full antialiased min-h-screen">
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

                    <Link href="/wiredex/my-pokemon" className="hidden text-sm font-semibold text-poke-blue hover:text-[var(--poke-yellow)] sm:block">
                        <span aria-hidden="true"> &larr;</span>
                        &nbsp;Back
                    </Link>

                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                    {
                        status === "loading"
                            ?
                            <p className="text-poke-white anitmate-pulse"> . . . Loading</p>
                            :
                            <>
                                {/* // ! Display Pokemon that is being queried */}
                                <div className="group max-h-12 aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                                    {
                                        mainPicture === null
                                            ?
                                            <p className="text-poke-white animate-pulse">
                                                Loading. . .
                                            </p>
                                            :
                                            <img
                                                src={mainPicture}
                                                alt={pokemon}
                                                className="object-cover object-center"
                                            />
                                    }

                                    <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                    <div className="border-b-4 w-full mb-3">
                                        <h2 className="text-poke-white bg-gradient-to-b from-[var(--poke-red)] to-transparent p-3 rounded text-xl mb-3 md:text-2xl">
                                            {pokemon}
                                        </h2>
                                    </div>
                                    {/* // ! height // */}
                                    <div className="border-b w-full mb-3">
                                        <p className="text-poke-white font-bold mb-3">
                                            Average Height:&nbsp;
                                            {
                                                height === null
                                                    ?
                                                    <span className="text-poke-red font-bold animate-ping">
                                                        ... Loading
                                                    </span>
                                                    :
                                                    <span className="text-poke-red font-bold">
                                                        {height}
                                                    </span>
                                            }
                                        </p>
                                    </div>
                                    {/* // ! weight // */}
                                    <div className="border-b w-full mb-3">
                                        <p className="text-poke-white font-bold mb-3">
                                            Average Weight:&nbsp;
                                            {
                                                weight === null
                                                    ?
                                                    <span className="text-poke-red font-bold animate-ping">
                                                        ... Loading
                                                    </span>
                                                    :
                                                    <span className="text-poke-red font-bold">
                                                        {weight}
                                                    </span>
                                            }
                                        </p>
                                    </div>

                                    {/* // ! types // */}

                                    <div className="border-b w-full mb-3">
                                        {
                                            types.length > 0
                                                ?
                                                <>
                                                    <p
                                                        className="text-poke-white font-bold mb-3"
                                                    >
                                                        Type(s):&nbsp;
                                                    </p>
                                                    {types.map((types, index) => (
                                                        isOpen[index]
                                                            ?
                                                            <div
                                                                key={index}
                                                            >
                                                                <div className="flex items-center">
                                                                    <p
                                                                        className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 mb-3 text-sm font-bold text-white ring-1 ring-inset ${typeColorSelector(types.name)}`}
                                                                    >
                                                                        {types.name}
                                                                    </p>
                                                                    <button className="text-poke-blue mb-3 ml-3"
                                                                        onClick={() => toggleIsOpen(index)}
                                                                    >
                                                                        <XMarkIcon />
                                                                    </button>
                                                                </div>
                                                                <ul className="text-poke-blue font-bold mb-3">

                                                                    <li>
                                                                        Double Damage To:&nbsp;
                                                                        {
                                                                            types.doubleDamageTo.length > 0
                                                                                ?


                                                                                types.doubleDamageTo.map((type, index) => (
                                                                                    <span
                                                                                        key={index}
                                                                                        className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-white ring-1 ring-inset ${typeColorSelector(type)}`}>
                                                                                        {type}
                                                                                    </span>
                                                                                ))


                                                                                :
                                                                                <span className="capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-poke-red ring-1 ring-inset">None</span>
                                                                        }
                                                                    </li>

                                                                    <li>
                                                                        Double Damage From:&nbsp;
                                                                        {
                                                                            types.doubleDamageFrom.length > 0
                                                                                ?


                                                                                types.doubleDamageFrom.map((type, index) => (
                                                                                    <span
                                                                                        key={index}
                                                                                        className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-white ring-1 ring-inset ${typeColorSelector(type)}`}>
                                                                                        {type}
                                                                                    </span>
                                                                                ))


                                                                                :
                                                                                <span className="capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-poke-red ring-1 ring-inset">None</span>
                                                                        }
                                                                    </li>

                                                                    <li>
                                                                        Half Damage To:&nbsp;
                                                                        {
                                                                            types.halfDamageTo.length > 0
                                                                                ?


                                                                                types.halfDamageTo.map((type, index) => (
                                                                                    <span
                                                                                        key={index}
                                                                                        className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-white ring-1 ring-inset ${typeColorSelector(type)}`}>
                                                                                        {type}
                                                                                    </span>
                                                                                ))


                                                                                :
                                                                                <span className="capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-poke-red ring-1 ring-inset">None</span>
                                                                        }
                                                                    </li>
                                                                    <li>
                                                                        Half Damage From:&nbsp;
                                                                        {
                                                                            types.halfDamageFrom.length > 0
                                                                                ?


                                                                                types.halfDamageFrom.map((type, index) => (
                                                                                    <span
                                                                                        key={index}
                                                                                        className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-white ring-1 ring-inset ${typeColorSelector(type)}`}>
                                                                                        {type}
                                                                                    </span>
                                                                                ))


                                                                                :
                                                                                <span className="capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-poke-red ring-1 ring-inset">None</span>
                                                                        }
                                                                    </li>

                                                                    <li>
                                                                        No Damage To:&nbsp;
                                                                        {
                                                                            types.noDamageTo.length > 0
                                                                                ?


                                                                                types.noDamageTo.map((type, index) => (
                                                                                    <span
                                                                                        key={index}
                                                                                        className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-white ring-1 ring-inset ${typeColorSelector(type)}`}>
                                                                                        {type}
                                                                                    </span>
                                                                                ))


                                                                                :
                                                                                <span className="capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-poke-red ring-1 ring-inset">None</span>
                                                                        }
                                                                    </li>

                                                                    <li>
                                                                        No Damage From:&nbsp;
                                                                        {
                                                                            types.noDamageFrom.length > 0
                                                                                ?


                                                                                types.noDamageFrom.map((type, index) => (
                                                                                    <span
                                                                                        key={index}
                                                                                        className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-white ring-1 ring-inset ${typeColorSelector(type)}`}>
                                                                                        {type}
                                                                                    </span>
                                                                                ))


                                                                                :
                                                                                <span className="capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 my-3 mx-1 text-sm font-bold text-poke-red ring-1 ring-inset">None</span>
                                                                        }
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                            :
                                                            <div
                                                                className="flex items-center"
                                                                key={index}
                                                            >
                                                                <p
                                                                    className={`capitalize inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 mb-3 text-sm font-bold text-white ring-1 ring-inset ${typeColorSelector(types.name)}`}
                                                                >
                                                                    {types.name}
                                                                </p>
                                                                <button
                                                                    className="text-poke-blue flex mb-3 ml-3"
                                                                    onClick={() => toggleIsOpen(index)}
                                                                >
                                                                    <ArrowsPointingOut />
                                                                </button>
                                                            </div>
                                                    ))}
                                                </>
                                                :
                                                null
                                        }
                                    </div>

                                    {/* // ! base experience // */}
                                    <div className="border-b w-full mb-3">
                                        <p className="text-poke-white font-bold mb-3">
                                            Base Experience:&nbsp;
                                            {
                                                baseExperience === null
                                                    ?
                                                    <span className="text-poke-red font-bold animate-ping">
                                                        ... Loading
                                                    </span>
                                                    :
                                                    <span className="text-poke-red font-bold">
                                                        {baseExperience}
                                                    </span>
                                            }
                                        </p>
                                    </div>

                                </div>
                            </>
                    }
                </div>

                <div className="mt-6 sm:hidden">
                    <a href="#" className="block text-sm font-semibold text-poke-blue hover:text-[var(--poke-yellow)]">
                        <span aria-hidden="true"> &larr;</span>
                        &nbsp;Back
                    </a>
                </div>
            </div>
        </div>
    )
}
