import ListPokemon from "./components/list-pokemon";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto my-5">
        <ListPokemon />
      </div>
    </div>
  );
}
