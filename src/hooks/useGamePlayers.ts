import { db } from "@/configs/firebase";
import { ActionType, GamePlayerType } from "@/contants/type";
import { GamePlayer } from "@/entities/GamePlayer";
import { orderBy } from "@/libs/orderBy";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "@firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useState } from "react";

export const useGamePlayers = () => {
  const [players, setPlayers] = useState<GamePlayer[]>();

  const loadGamePlayers = (gameId: string) => {
    const q = query(
      collection(db, ActionType.GAMES, gameId, ActionType.GAMEPLAYERS),
    );
    onSnapshot(q, (snapshot) => {
      const games: any[] = [];
      snapshot.forEach((doc) => {
        games.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setPlayers(orderBy(games, "createdAt", "desc"));
    });
  };

  const createGamePlayer = async (gameId: string, player: GamePlayerType) => {
    const newId = uuidv4();
    await setDoc(
      doc(db, ActionType.GAMES, gameId, ActionType.GAMEPLAYERS, newId),
      player,
    );
  };

  return { players, loadGamePlayers, createGamePlayer };
};
