import Image from "next/image";

export default function SearchField() {
  return (
    <div>
      <label htmlFor="myPokemon" className="block text-sm font-medium text-poke-white text-center">
        Search for a pokémon!
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Image 
            src={'/img/profile_settings/MyPokemonIcon.png'}
            alt="pokeball"
            width={25}
            height={25}
            />
        </div>
        <input
          type="text"
          name="myPokemon"
          id="myPokemon"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Pikachu"
        />
      </div>
    </div>
  )
}
