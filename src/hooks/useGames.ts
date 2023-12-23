import { auth, db } from "@/configs/firebase";
import { ActionType } from "@/contants/type";
import { Game } from "@/entities/Game";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCurrentUser } from ".";
import { orderBy } from "@/libs/orderBy";
import { v4 as uuidv4 } from "uuid";

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

  const deleteGame = async (gameId: string) => {
    await deleteDoc(doc(db, ActionType.GAMES, gameId));
  };

  return { games, createGame, deleteGame };
};
