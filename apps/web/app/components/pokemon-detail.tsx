"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
};

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

const PokemonDetail = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokemon with ID ${id}`);
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching Pokemon details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokemon data found</div>;

  return (
    <div className=" p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center relative">
          <Image
            src={
              pokemon.sprites.other?.["official-artwork"]?.front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            width={256}
            height={256}
            className="w-64 h-64 object-contain mx-auto"
          />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h1>
          <div className="flex gap-2 mb-4">
            {pokemon.types.map((typeInfo, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-white text-sm capitalize bg-blue-500"
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2  rounded">
              <p className="text-gray-500">Height</p>
              <p className="font-bold">{pokemon.height / 10}m</p>
            </div>
            <div className="text-center p-2 rounded">
              <p className="text-gray-500">Weight</p>
              <p className="font-bold">{pokemon.weight / 10}kg</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Stats</h2>
        {pokemon.stats.map((stat, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="capitalize">
                {stat.stat.name.replace("-", " ")}
              </span>
              <span className="font-bold">{stat.base_stat}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${Math.min(100, (stat.base_stat / 255) * 100)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Abilities</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.abilities.map((ability, index) => (
            <span key={index} className="px-3 py-1 rounded-full capitalize">
              {ability.ability.name.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
