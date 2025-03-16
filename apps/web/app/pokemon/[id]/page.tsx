import React from "react";
import PokemonDetail from "../../components/pokemon-detail";
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
