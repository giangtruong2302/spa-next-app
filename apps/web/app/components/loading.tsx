export default function Loading() {
  return (
    <div className="p-6 max-w-6xl mx-auto flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Loading Pokémon data...</p>
      </div>
    </div>
  );
}
