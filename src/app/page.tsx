"use client";
import React from "react";
import { todayPlayer, nameMatches, maxGuessesFor, getHint } from "@/lib/game";

export default function Home() {
  const p = todayPlayer();
  const [guess, setGuess] = React.useState("");
  const [guesses, setGuesses] = React.useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("guesses") || "[]");
  });
  const [hintLevel, setHintLevel] = React.useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("hintLevel") || 0);
  });
  const won = guesses.some(g => nameMatches(g, p.full_name, p.aliases));
  const maxGuesses = maxGuessesFor(p.full_name);

  React.useEffect(() => {
    localStorage.setItem("guesses", JSON.stringify(guesses));
    localStorage.setItem("hintLevel", String(hintLevel));
  }, [guesses, hintLevel]);

  function submitGuess(e: React.FormEvent) {
    e.preventDefault();
    if (!guess.trim() || won || guesses.length >= maxGuesses) return;
    setGuesses(prev => [...prev, guess.trim()]);
    setGuess("");
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-2">GoalGuessr — The Daily Footy Riddle</h1>
        <p className="text-sm text-neutral-300 mb-4">Guess today’s player. More letters = more guesses.</p>

        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Guesses: {guesses.length}/{maxGuesses}</span>
            <button
              className="text-sm underline"
              onClick={() => setHintLevel(h => Math.min(h + 1, 4))}
              disabled={hintLevel >= 4}
            >
              {hintLevel < 4 ? "Get a hint" : "No more hints"}
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {[...Array(hintLevel + 1)].map((_, i) => (
              <li key={i} className="text-neutral-200">💡 {getHint(p, i as any)}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={submitGuess} className="flex gap-2 mb-3">
          <input
            className="flex-1 px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
            placeholder="Type a player name…"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            disabled={won || guesses.length >= maxGuesses}
          />
          <button
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"
            disabled={won || guesses.length >= maxGuesses}
          >
            Guess
          </button>
        </form>

        <div className="space-y-2">
          {guesses.map((g, i) => {
            const ok = nameMatches(g, p.full_name, p.aliases);
            return (
              <div key={i} className={`p-2 rounded-xl border ${ok ? "border-emerald-500 bg-emerald-900/30" : "border-neutral-700 bg-neutral-800"}`}>
                {g} {ok && <span className="ml-2">✅</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          {won ? (
            <div className="p-3 rounded-xl bg-emerald-700/30 border border-emerald-600">
              🎉 You got it! It was <b>{p.full_name}</b>.
            </div>
          ) : guesses.length >= maxGuesses ? (
            <div className="p-3 rounded-xl bg-rose-800/30 border border-rose-600">
              😵 Out of guesses. It was <b>{p.full_name}</b>. Come back tomorrow!
            </div>
          ) : null}
        </div>

        <footer className="mt-8 text-xs text-neutral-400">
          <div>Sponsored by <a className="underline" href="#" onClick={(e)=>e.preventDefault()}>your brand here</a></div>
          <div className="mt-1">© {new Date().getFullYear()} GoalGuessr</div>
        </footer>
      </div>
    </main>
  );
}
