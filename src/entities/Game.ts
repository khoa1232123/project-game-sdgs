import firebase from "firebase/compat/app";

export type SupportedLang = "en" | "ja" | "ja-JP" | "zh-tw" | "es" | "ja-easy";

export type Game = {
  id: string;
  host: string;
  playerHash: string;
  toResetHash: string;
  facilitatorUid: string;
  facilitatorName: string;
  facilitatorLanguage: SupportedLang;
  facilitatorAvatar: string;
  title: string;
  facilitatorMessage: string;
  status: number;
  isPaused?: boolean;
  isResetting?: boolean;
  pausedMinutes?: string;
  pausedSeconds?: string;
  playerUrlHash?: string;
  toSaveReportHash?: string;
  numberOfPlayers?: number;
  wmEconomy?: number;
  wmEnvironment?: number;
  wmSociety?: number;
  projectExecutingPlayerIds: string[];
  date: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
  startedAt: firebase.firestore.Timestamp;
  startedOnceAt: firebase.firestore.Timestamp;
  expiredAt: firebase.firestore.Timestamp;
  willEndAt: firebase.firestore.Timestamp;
  restSecondsAtPause: number;
  withBlankGoal: boolean;
};
