import { useState, useEffect } from "react";

export default function GuessInput({ onGuess }) {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Fetch all players on load
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Failed to fetch players", err));
  }, []);

  // Update filtered list based on input
  useEffect(() => {
    const matches = players.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(matches.slice(0, 5));
  }, [query, players]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = players.find(
      (p) => p.name.toLowerCase() === query.toLowerCase()
    );
    if (match) {
      onGuess(match);
      setQuery("");
      setFiltered([]);
    } else {
      alert("Player not found. Try a full name.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative">
      <input
        type="text"
        value={query}
        placeholder="Guess a player..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded border border-gray-300 shadow-sm"
      />

      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded shadow max-h-48 overflow-y-auto">
          {filtered.map((player) => (
            <li
              key={player.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setQuery(player.name);
                setFiltered([]);
              }}
            >
              {player.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
