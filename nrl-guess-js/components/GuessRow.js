import { useState, useEffect } from "react";
import GuessInput from "../components/GuessInput";
import GuessRow from "../components/GuessRow";

export default function Home() {
  const [guesses, setGuesses] = useState([]);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    fetch("/api/target")
      .then((res) => res.json())
      .then((data) => setAnswer(data));
  }, []);

  const handleGuess = (player) => {
    setGuesses([...guesses, player]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">NRL Guessing Game</h1>
      {answer && <GuessInput onGuess={handleGuess} />}
      <div className="mt-6 space-y-3 max-w-2xl mx-auto">
        {guesses.map((guess, index) => (
          <GuessRow key={index} guess={guess} answer={answer} />
        ))}
      </div>
    </div>
  );
}
