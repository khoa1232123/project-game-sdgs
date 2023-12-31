export const ActionType = {
  GAMES: "games",
  GAMEPLAYERS: "players",
  GAME: "game",
  GAMEPLAYER: "player",
  FACILITATOR: "facilitator",
  FACILITATORS: "facilitators",
  USERS: 'users'
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  displayName: string;
  email: string;
  password: string;
};

export type GameType = {
  title: string;
  wmEconomy?: number;
  wmEnvironment?: number;
  wmSociety?: number;
  status?: number;
  playerUrlHash: string;
  playerHash: string;
};

export type GamePlayerType = {
  nickname: string;
  password: string;
};
