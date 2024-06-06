import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

const stats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of servers', value: '3' },
  { name: 'Success rate', value: '98.5%' },
]

export default function RouteStats() {

  const [pokemonData, setPokemonData] = useState([]);
  const { data: status } = useSession();

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

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
