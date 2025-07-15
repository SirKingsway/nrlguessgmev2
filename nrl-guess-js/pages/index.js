
import { useState } from "react";
import GuessInput from "../components/GuessInput";

export default function Home() {
  const [guesses, setGuesses] = useState([]);

  const handleGuess = (player) => {
    setGuesses([...guesses, player]);
    console.log("You guessed:", player);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">NRL Guessing Game</h1>
      <GuessInput onGuess={handleGuess} />
      <div className="mt-6 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">Your Guesses:</h2>
        <ul className="space-y-2">
          {guesses.map((g, i) => (
            <li key={i} className="bg-white p-3 shadow rounded">
              {g.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
