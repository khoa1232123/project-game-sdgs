import { Game } from "@/entities/Game";

export const getPlayerUrlHost = (game?: Game) => {
  return game?.host
    ? getHostName(game)
    : typeof window !== "undefined"
      ? window?.location?.host || ""
      : "";
};

export const getPlayerUrlHttpHost = (game?: Game) => {
  return game?.host && game.host !== "local"
    ? "https://" + getHostName(game)
    : "http://" + window.location.host;
};

export const getHostName = (game: Game) => {
  return game?.host === "local" ? "localhost:3100" : game?.host;
};

export const getPlayerUrl = (game?: Game) => {
  return `${
    (getPlayerUrlHost(game) || "").indexOf("local") > -1 ? "http" : "https"
  }://${getPlayerUrlHost(game)}/player/entry/${game?.playerUrlHash}`;
};
