export type Player = {
  full_name: string;
  aliases?: string[];
  nationality: string;   // e.g., "🇦🇷 Argentina"
  position: "FW" | "MF" | "DF" | "GK";
  league: string;        // text only, e.g., "Premier League"
  birth_year: number;
  height_cm?: number;
};

export const PLAYERS: Player[] = [
  { full_name: "Lionel Messi", aliases:["messi"], nationality: "🇦🇷 Argentina", position:"FW", league:"MLS", birth_year:1987, height_cm:170 },
  { full_name: "Cristiano Ronaldo", aliases:["ronaldo","cr7"], nationality: "🇵🇹 Portugal", position:"FW", league:"Saudi Pro League", birth_year:1985, height_cm:187 },
  { full_name: "Erling Haaland", aliases:["haaland"], nationality: "🇳🇴 Norway", position:"FW", league:"Premier League", birth_year:2000, height_cm:194 },
  { full_name: "Kevin De Bruyne", aliases:["debruyne","de bruyne","kdb"], nationality:"🇧🇪 Belgium", position:"MF", league:"Premier League", birth_year:1991, height_cm:181 },
  { full_name: "Kylian Mbappé", aliases:["mbappe","mbappé"], nationality:"🇫🇷 France", position:"FW", league:"Ligue 1", birth_year:1998, height_cm:178 },
  // add 10–20 more to start
];
