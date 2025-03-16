"use client";
import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { IPokemon } from "../types";
import { useRouter } from "next/navigation";
import CardPokemon from "./card-pokemon";

const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      results {
        id
        name
        artwork
        dreamworld
        image
        url
      }
    }
  }
`;

// const GET_POKEMON_TYPE = gql`
//   {
//     __type(name: "Pokemon") {
//       name
//       fields {
//         name
//         type {
//           name
//           kind
//         }
//       }
//     }
//   }
// `;

const ListPokemon = () => {
  const router = useRouter();
  const handleRedirectDetailPokemon = (url: string) => {
    if (!url) return;
    router.push(`/pokemon/${url}`);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { loading, data, error } = useQuery<{
    pokemons: {
      count: number;
      next: string | null;
      previous: string | null;
      results: IPokemon[];
      dreamworld: string;
      image: string;
      url: string;
    };
  }>(GET_POKEMONS, {
    variables: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    },
  });

  const totalPages = data?.pokemons.count
    ? Math.ceil(data.pokemons.count / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when page changes
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top when page changes
    }
  };

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <>
      <h3 className="mt-6 text-4xl font-bold">Pokemons</h3>

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array(itemsPerPage)
            .fill(0)
            .map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="animate-pulse bg-gray-800 flex flex-col justify-between gap-2 p-2 h-72 rounded-xl border-8 border-gray-700"
              >
                <div className="bg-gray-700 h-48 rounded"></div>
                <div className="bg-gray-700 h-6 rounded w-3/4 mx-auto"></div>
              </div>
            ))
        ) : data?.pokemons.results && data.pokemons.results.length > 0 ? (
          data.pokemons.results.map((pokemon) => {
            return (
              <CardPokemon
                key={pokemon.id}
                pokemon={pokemon}
                handleRedirectDetailPokemon={handleRedirectDetailPokemon}
              />
            );
          })
        ) : (
          <p className="text-white col-span-full">No Pokemon found</p>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 0 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <span className="dark:text-white text-black">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ListPokemon;
