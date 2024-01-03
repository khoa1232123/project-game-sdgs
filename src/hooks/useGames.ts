import { db } from "@/configs/firebase";
import { ActionType } from "@/contants/type";
import { Game } from "@/entities/Game";
import { orderBy } from "@/libs/orderBy";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCurrentUser } from ".";

export const useGames = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useCurrentUser();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    const loadGames = () => {
      const q = query(
        collection(db, ActionType.GAMES),
        where("userId", "==", user?.uid),
      );
      onSnapshot(q, (snapshot) => {
        const games: any[] = [];
        snapshot.forEach((doc) => {
          games.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setGames(orderBy(games, "createdAt", "desc"));
      });
    };
    loadGames();
  }, [user?.uid]);

  const createGame = async (title: string) => {
    const newId = uuidv4();
    const gameRef = doc(db, ActionType.GAMES, newId);
    await setDoc(gameRef, {
      title: title,
      userId: user?.uid,
      playerUrlHash: uuidv4(),
      wmEconomy: 3,
      wmEnvironment: 3,
      wmSociety: 3,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const updateGame = async (game: Game) => {
    if (!game?.id) return;
    const gameRef = doc(db, ActionType.GAMES, game.id);
    await updateDoc(gameRef, {
      ...game,
    });
  };

  const deleteGame = async (gameId: string) => {
    await deleteDoc(doc(db, ActionType.GAMES, gameId));
  };

  return { games, createGame, deleteGame, updateGame };
};
