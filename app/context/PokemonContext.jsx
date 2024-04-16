import React, { createContext, useContext, useState, useEffect } from 'react';

const PokemonContext = createContext();

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error('usePokemon must be used within a PokemonProvider');
    }
    const { selectedPokemon, setSelectedPokemon } = context;
    return [selectedPokemon, setSelectedPokemon];
}

export const PokemonProvider = ({ children }) => {
    const [selectedPokemon, setSelectedPokemon] = useState(() => {
        return localStorage.getItem('selectedPokemon') || '';
    });

    useEffect(() => {

        const handleStorageChange = () => {
            setSelectedPokemon(localStorage.getItem('selectedPokemon') || '');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
            {children}
        </PokemonContext.Provider>
    );
};