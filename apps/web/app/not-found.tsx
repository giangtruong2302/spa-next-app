import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-6 max-w-6xl mx-auto flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Pokémon Not Found</h2>
        <p className="mb-6">
          Sorry, we couldn't find the Pokémon you're looking for.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Back to Pokémon List
        </Link>
      </div>
    </div>
  );
}
