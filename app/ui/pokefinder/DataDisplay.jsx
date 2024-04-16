'use client'

import { usePokemon } from "@/app/context/PokemonContext";

export default function DataDisplay() {

    const [selectedPokemon, setSelectedPokemon] = usePokemon();

    return (
        <>
            <div className='bg-dark-blue p-10 mt-3 rounded'>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-white">PokéFinder</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">Discover your favorite pokémon</p>
                </div>
                <div className="mt-6 border-t border-white/10">
                    <dl className="divide-y divide-white/10">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Pokémon</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{selectedPokemon}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Pokémon Stats</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">(live data)</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Pokémon Stats</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">(live data)</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-white">Salary expectation</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">(live data)</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}
