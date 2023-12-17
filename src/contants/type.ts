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
