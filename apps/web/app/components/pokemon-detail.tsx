import Image from "next/image";
import { notFound } from "next/navigation";

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

// Generate static params for common Pokemon IDs
export async function generateStaticParams() {
  // Pre-generate the first 151 Pokemon (or any range you prefer)
  const ids = Array.from({ length: 151 }, (_, i) => ({
    id: String(i + 1),
  }));

  return ids;
}

// Fetch data with ISR
async function getPokemonData(id: string): Promise<PokemonData> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
    next: {
      revalidate: 3600, // Revalidate every hour
    },
  });
  console.log("res", response);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon with ID ${id}`);
  }

  return response.json();
}
type Props = {
  id: string;
};
export default async function PokemonDetail({ id }: Props) {
  try {
    const pokemon = await getPokemonData(id);

    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center relative">
            <Image
              src={
                pokemon.sprites.other?.["official-artwork"]?.front_default ||
                pokemon.sprites.front_default ||
                "/placeholder.svg"
              }
              alt={pokemon.name}
              width={256}
              height={256}
              className="w-64 h-64 object-contain mx-auto"
              priority
            />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold capitalize mb-2">
              {pokemon.name}
            </h1>
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
              <div className="text-center p-2 rounded">
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
  } catch (error) {
    console.log("error: ", error);
    notFound();
  }
}
