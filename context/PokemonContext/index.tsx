"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Pokemon } from "@/types";

interface PokemonContextType {
    caughtPokemons: Pokemon[];
    catchPokemon: (pokemon: Pokemon) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        const savedPokemons = localStorage.getItem("caughtPokemons");
        if (savedPokemons) {
            setCaughtPokemons(JSON.parse(savedPokemons));
        }
    }, []);

    const catchPokemon = (pokemon: Pokemon) => {
        if (!caughtPokemons.some((p) => p.id === pokemon.id)) {
            const updatedPokemons = [...caughtPokemons, pokemon];
            setCaughtPokemons(updatedPokemons);
            localStorage.setItem("caughtPokemons", JSON.stringify(updatedPokemons));
        }
    };

    return (
        <PokemonContext.Provider value={{ caughtPokemons, catchPokemon }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error("usePokemon must be used within a PokemonProvider");
    }
    return context;
};
