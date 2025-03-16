import React from "react";
import { IPokemon } from "../types";
import Image from "next/image";
type Props = {
  pokemon: IPokemon;
  handleRedirectDetailPokemon: (id: string) => void;
};
const CardPokemon = ({ pokemon, handleRedirectDetailPokemon }: Props) => {
  return (
    <div
      className="bg-gray-700 flex flex-col justify-between gap-2 p-2 h-72 rounded-xl border-8 border-gray-100 hover:border-blue-300 transition-all"
      key={pokemon.id}
    >
      <div className="relative h-48">
        <Image
          src={pokemon.artwork}
          alt={pokemon.name}
          className="w-full min-h-48 h-auto object-contain"
          fill
        />
      </div>
      <div className="flex justify-evenly items-center">
        <p className="text-white text-center capitalize">{pokemon.name}</p>
        <button
          className="text-white "
          onClick={() => {
            handleRedirectDetailPokemon(pokemon.id);
          }}
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default CardPokemon;
