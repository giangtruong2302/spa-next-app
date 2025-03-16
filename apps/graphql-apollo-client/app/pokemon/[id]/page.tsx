import PokemonDetail from "@/app/components/pokemon-detail";
import React from "react";
// interface PokemonDetailPageProps {
//   params: {
//     id: string;
//   };
// }
const PokemonDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <PokemonDetail id={id} />
    </div>
  );
};

export default PokemonDetailPage;
