import { useState, useEffect } from "react";

export default function GuessInput({ onGuess }) {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Fetch all players on load
  useEffect(() => {
    fetch("/api/players")
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

  // Filter matches as user types
  useEffect(() => {
    const matches = players.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(matches.slice(0, 5)); // Show top 5 matches
  }, [query, players]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = players.find(p => p.name.toLowerCase() === query.toLowerCase());
    if (selected) {
      onGuess(selected);
      setQuery("");
    } else {
      alert("Player not found");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Guess a player..."
        className="w-full border px-4 py-2 rounded mb-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.length > 0 && (
        <ul className="bg-white border rounded shadow text-sm">
          {filtered.map(player => (
            <li
              key={player.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setQuery(player.name);
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
