'use client'
import { useState, useEffect } from 'react';
import userAuthentication from "@/app/utils/userAuthentication";
import RouteListDropDown from "@/app/ui/routelist/RouteListDropDown";
import RouteStats from "@/app/ui/routelist/RouteStats";
import { useSession } from 'next-auth/react';

export default function RouteListPage() {
    userAuthentication();
    const [pokemonData, setPokemonData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const { data: session, status } = useSession();

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
        if (selectedPokemon && !selectedPokemon.routes) {
            const fetchRouteData = async () => {
                const encounterData = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name.toLowerCase()}/encounters`;

                try {
                    const response = await fetch(encounterData);
                    if (!response.ok) {
                        throw new Error(`Failed to get route data for ${selectedPokemon.name}`);
                    }
                    const data = await response.json();
                    setSelectedPokemon(prev => ({ ...prev, routes: data }));
                } catch (error) {
                    console.error(error);
                }
            };

            fetchRouteData();
        }
    }, [selectedPokemon]);

    return (
        <>
            <div className="min-h-full w-full flex flex-col items-center">
                <div className="mt-5 ml-5 w-full sm:w-1/3">
                    <RouteListDropDown
                        pokemonData={pokemonData}
                        selectedPokemon={selectedPokemon}
                        setSelectedPokemon={setSelectedPokemon}
                    />
                </div>
                <div className="mt-5 ml-5 mr-5 w-full">
                    <RouteStats selectedPokemon={selectedPokemon} />
                </div>
            </div>
        </>
    );
}
