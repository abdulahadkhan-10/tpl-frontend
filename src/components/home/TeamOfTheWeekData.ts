// ============================================================
// TEMPORARY MOCK DATA
// ============================================================
// This data is currently hardcoded for frontend development.
//
// FUTURE BACKEND:
// The backend should return the Team of the Week based on
// player performance statistics for the selected matchweek and formation.
//
// The frontend should NOT manually decide the official XI.
// It should receive the selected players from the backend.
// ============================================================

export interface PlayerStats {
  goals: number;
  assists: number;
  minutes: number;
}

export interface Player {
  playerId: string;
  playerName: string;
  position: string; // GK, LB, CB, RB, CDM, CM, LM, RM, LW, RW, ST, etc.
  team: string;
  teamLogo: string;
  playerImage: string;
  rating: number;
  matchweek: number;
  stats: PlayerStats;
}

export interface TeamOfTheWeekResponse {
  matchweek: number;
  formation: string;
  players: Player[];
}

// Helper mock players to distribute across formations
const mockPlayersList: Record<string, Player> = {
  gk_1: { playerId: "gk-01", playerName: "Jack Porter", position: "GK", team: "Arsenal Academy", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 94, matchweek: 8, stats: { goals: 0, assists: 0, minutes: 90 } },
  gk_2: { playerId: "gk-02", playerName: "Billy Gil", position: "GK", team: "Chelsea Foundation", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 88, matchweek: 8, stats: { goals: 0, assists: 0, minutes: 90 } },
  
  cb_1: { playerId: "cb-01", playerName: "Kaelan Casey", position: "CB", team: "West Ham United", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 94, matchweek: 8, stats: { goals: 0, assists: 0, minutes: 90 } },
  cb_2: { playerId: "cb-02", playerName: "Reece Whitlock", position: "CB", team: "Chelsea Foundation", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 87, matchweek: 8, stats: { goals: 1, assists: 0, minutes: 90 } },
  cb_3: { playerId: "cb-03", playerName: "Charlie Crew", position: "CB", team: "Leeds Academy", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 87, matchweek: 8, stats: { goals: 0, assists: 0, minutes: 90 } },

  lb_1: { playerId: "lb-01", playerName: "Myles Okafor", position: "LB", team: "Arsenal Academy", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 95, matchweek: 8, stats: { goals: 0, assists: 1, minutes: 90 } },
  rb_1: { playerId: "rb-01", playerName: "George Whitfield", position: "RB", team: "West Ham Academy", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 97, matchweek: 8, stats: { goals: 0, assists: 0, minutes: 90 } },

  cdm_1: { playerId: "cdm-01", playerName: "Jobe Kingsley", position: "CDM", team: "Birmingham Foundation", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 98, matchweek: 8, stats: { goals: 1, assists: 0, minutes: 90 } },
  cm_1: { playerId: "cm-01", playerName: "Billy Gil", position: "CM", team: "Chelsea Foundation", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 94, matchweek: 8, stats: { goals: 1, assists: 2, minutes: 90 } },
  cm_2: { playerId: "cm-02", playerName: "Ethan Priestley", position: "CM", team: "Arsenal Academy", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 93, matchweek: 8, stats: { goals: 0, assists: 0, minutes: 90 } },

  lw_1: { playerId: "lw-01", playerName: "Elhan Davies", position: "LW", team: "London United", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 96, matchweek: 8, stats: { goals: 2, assists: 1, minutes: 90 } },
  rw_1: { playerId: "rw-01", playerName: "Tyler Ashcombe", position: "RW", team: "Southampton Youth", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 92, matchweek: 8, stats: { goals: 1, assists: 1, minutes: 90 } },
  st_1: { playerId: "st-01", playerName: "Mikey Fontaine", position: "ST", team: "Tottenham Academy", teamLogo: "/images/TPL_logo_White.png", playerImage: "/images/player_placeholder_nobg.png", rating: 98, matchweek: 8, stats: { goals: 3, assists: 0, minutes: 90 } },
};

// Return a configuration of 11 players placed based on formation grid coordinates.
// Coordinates are represented as { left: "X%", top: "Y%" } of the pitch
export interface PositionedPlayer extends Player {
  coords: { left: string; top: string };
}

export function getTeamOfTheWeek(matchweek: number, formation: string): PositionedPlayer[] {
  // Simple coordinate maps for different formations
  // top: 0% is opponents goal line, 90% is own goal line
  const formationsMap: Record<string, { pos: string; coords: { left: string; top: string } }[]> = {
    "4-3-3": [
      { pos: "GK", coords: { left: "50%", top: "85%" } },
      { pos: "LB", coords: { left: "15%", top: "65%" } },
      { pos: "CB", coords: { left: "38%", top: "68%" } },
      { pos: "CB", coords: { left: "62%", top: "68%" } },
      { pos: "RB", coords: { left: "85%", top: "65%" } },
      { pos: "CDM", coords: { left: "50%", top: "48%" } },
      { pos: "CM", coords: { left: "30%", top: "38%" } },
      { pos: "CM", coords: { left: "70%", top: "38%" } },
      { pos: "LW", coords: { left: "20%", top: "15%" } },
      { pos: "ST", coords: { left: "50%", top: "12%" } },
      { pos: "RW", coords: { left: "80%", top: "15%" } },
    ],
    "4-4-2": [
      { pos: "GK", coords: { left: "50%", top: "85%" } },
      { pos: "LB", coords: { left: "15%", top: "65%" } },
      { pos: "CB", coords: { left: "38%", top: "68%" } },
      { pos: "CB", coords: { left: "62%", top: "68%" } },
      { pos: "RB", coords: { left: "85%", top: "65%" } },
      { pos: "LM", coords: { left: "15%", top: "40%" } },
      { pos: "CM", coords: { left: "38%", top: "43%" } },
      { pos: "CM", coords: { left: "62%", top: "43%" } },
      { pos: "RM", coords: { left: "85%", top: "40%" } },
      { pos: "ST", coords: { left: "35%", top: "15%" } },
      { pos: "ST", coords: { left: "65%", top: "15%" } },
    ],
    "4-2-3-1": [
      { pos: "GK", coords: { left: "50%", top: "85%" } },
      { pos: "LB", coords: { left: "15%", top: "68%" } },
      { pos: "CB", coords: { left: "38%", top: "70%" } },
      { pos: "CB", coords: { left: "62%", top: "70%" } },
      { pos: "RB", coords: { left: "85%", top: "68%" } },
      { pos: "CDM", coords: { left: "35%", top: "52%" } },
      { pos: "CDM", coords: { left: "65%", top: "52%" } },
      { pos: "LM", coords: { left: "20%", top: "32%" } },
      { pos: "AM", coords: { left: "50%", top: "30%" } },
      { pos: "RM", coords: { left: "80%", top: "32%" } },
      { pos: "ST", coords: { left: "50%", top: "10%" } },
    ],
    "3-4-3": [
      { pos: "GK", coords: { left: "50%", top: "85%" } },
      { pos: "CB", coords: { left: "25%", top: "68%" } },
      { pos: "CB", coords: { left: "50%", top: "70%" } },
      { pos: "CB", coords: { left: "75%", top: "68%" } },
      { pos: "LM", coords: { left: "15%", top: "45%" } },
      { pos: "CM", coords: { left: "38%", top: "48%" } },
      { pos: "CM", coords: { left: "62%", top: "48%" } },
      { pos: "RM", coords: { left: "85%", top: "45%" } },
      { pos: "LW", coords: { left: "20%", top: "18%" } },
      { pos: "ST", coords: { left: "50%", top: "15%" } },
      { pos: "RW", coords: { left: "80%", top: "18%" } },
    ],
    "3-5-2": [
      { pos: "GK", coords: { left: "50%", top: "85%" } },
      { pos: "CB", coords: { left: "25%", top: "68%" } },
      { pos: "CB", coords: { left: "50%", top: "70%" } },
      { pos: "CB", coords: { left: "75%", top: "68%" } },
      { pos: "LWB", coords: { left: "15%", top: "45%" } },
      { pos: "CM", coords: { left: "33%", top: "48%" } },
      { pos: "CDM", coords: { left: "50%", top: "52%" } },
      { pos: "CM", coords: { left: "67%", top: "48%" } },
      { pos: "RWB", coords: { left: "85%", top: "45%" } },
      { pos: "ST", coords: { left: "35%", top: "18%" } },
      { pos: "ST", coords: { left: "65%", top: "18%" } },
    ]
  };

  const selectedFormation = formationsMap[formation] || formationsMap["4-3-3"];

  // Return formatted array of positioned players based on mock list
  return selectedFormation.map((slot, index) => {
    let pKey = "st_1";
    if (slot.pos === "GK") pKey = "gk_1";
    else if (slot.pos === "LB" || slot.pos === "LWB") pKey = "lb_1";
    else if (slot.pos === "RB" || slot.pos === "RWB") pKey = "rb_1";
    else if (slot.pos === "CB") pKey = `cb_${(index % 3) + 1}`;
    else if (slot.pos === "CDM") pKey = "cdm_1";
    else if (slot.pos === "CM" || slot.pos === "AM") pKey = `cm_${(index % 2) + 1}`;
    else if (slot.pos === "LM" || slot.pos === "LW") pKey = "lw_1";
    else if (slot.pos === "RM" || slot.pos === "RW") pKey = "rw_1";

    const basePlayer = mockPlayersList[pKey] || mockPlayersList["st_1"];
    
    // Vary ratings slightly based on matchweek for visual demo feedback
    const ratedPlayer = {
      ...basePlayer,
      position: slot.pos,
      rating: Math.min(99, basePlayer.rating + (matchweek % 3) - 1),
    };

    return {
      ...ratedPlayer,
      coords: slot.coords
    };
  });
}

export const mockRankings: Record<string, { name: string; team: string; rating: number; teamLogo: string }[]> = {
  GK: [
    { name: "Jack Porter", team: "Arsenal Academy", rating: 94, teamLogo: "/images/TPL_logo_White.png" },
    { name: "Billy Gil", team: "Chelsea Foundation", rating: 88, teamLogo: "/images/TPL_logo_White.png" },
    { name: "David Ozoh", team: "Crystal Palace", rating: 87, teamLogo: "/images/TPL_logo_White.png" },
    { name: "Val Adedokun", team: "Brentford Academy", rating: 84, teamLogo: "/images/TPL_logo_White.png" },
  ],
  DEF: [
    { name: "Myles Okafor", team: "Arsenal Academy", rating: 95, teamLogo: "/images/TPL_logo_White.png" },
    { name: "Kaelan Casey", team: "West Ham United", rating: 94, teamLogo: "/images/TPL_logo_White.png" },
    { name: "George Whitfield", team: "West Ham Academy", rating: 97, teamLogo: "/images/TPL_logo_White.png" },
    { name: "Reece Whitlock", team: "Chelsea Foundation", rating: 87, teamLogo: "/images/TPL_logo_White.png" },
  ],
  MID: [
    { name: "Jobe Kingsley", team: "Birmingham Foundation", rating: 98, teamLogo: "/images/TPL_logo_White.png" },
    { name: "Billy Gil", team: "Chelsea Foundation", rating: 94, teamLogo: "/images/TPL_logo_White.png" },
    { name: "Ethan Priestley", team: "Arsenal Academy", rating: 93, teamLogo: "/images/TPL_logo_White.png" },
  ],
  ATT: [
    { name: "Mikey Fontaine", team: "Tottenham Academy", rating: 98, teamLogo: "/images/TPL_logo_White.png" },
    { name: "Elhan Davies", team: "London United", rating: 96, teamLogo: "/images/TPL_logo_White.png" },
    { name: "Tyler Ashcombe", team: "Southampton Youth", rating: 92, teamLogo: "/images/TPL_logo_White.png" },
  ],
};
