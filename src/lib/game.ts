import { PLAYERS } from "@/data/players";

export function todayIndex(date = new Date()): number {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const seed = Number(d) / 86400000; // days since epoch
  // simple hash
  const h = Math.abs(Math.sin(seed) * 10000);
  return Math.floor(h) % PLAYERS.length;
}

export function todayPlayer() {
  return PLAYERS[todayIndex()];
}

// normalize names for matching
export function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function nameMatches(input: string, fullName: string, aliases: string[] = []) {
  const nIn = norm(input);
  const targets = [norm(fullName), ...aliases.map(norm)];
  return targets.includes(nIn);
}

// dynamic guess count: longer names → a bit more tries
export function maxGuessesFor(name: string) {
  const len = norm(name).replace(/ /g, "").length;
  return 6 + Math.floor(Math.max(0, len - 5) / 2);
}

export type HintLevel = 0|1|2|3|4|5;
export function getHint(player: any, level: HintLevel) {
  const hints = [
    `Nationality: ${player.nationality}`,
    `Position: ${player.position}`,
    `League: ${player.league}`,
    `Birth year: ${player.birth_year}`,
    player.height_cm ? `Height: ${player.height_cm-2}–${player.height_cm+2} cm` : "Height: n/a",
  ];
  return hints[Math.min(level, hints.length-1)];
}
