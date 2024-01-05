import { db } from "@/configs/firebase";
import { ActionType, GamePlayerType } from "@/contants/type";
import { GamePlayer } from "@/entities/GamePlayer";
import { orderBy } from "@/libs/orderBy";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  deleteDoc,
} from "@firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const useGamePlayers = () => {
  const router = useRouter();
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
    if (!player.nickname) {
      toast.error("Ban can dat nickname de nguoi ta con biet");
      return;
    }
    if (!player.password) {
      toast.error("Ban can dat dat password");
      return;
    }
    const newId = uuidv4();
    const q = query(
      collection(db, ActionType.GAMES, gameId, ActionType.GAMEPLAYERS),
      where("nickname", "==", player.nickname),
    );

    const snapshot = await getDocs(q);

    if (snapshot.docs.length > 0) {
      const playerUser: any = {
        ...snapshot.docs[0].data(),
        id: snapshot.docs[0].id,
      };
      console.log({ playerUser, player });

      if (playerUser.password === player.password) {
        localStorage.setItem(
          "playerLogin",
          `${ActionType.GAMES}/${gameId}/${ActionType.GAMEPLAYERS}/${playerUser.id}`,
        );
      } else {
        toast.error(
          "nickname da co nguoi dat, ban co the dat lai nickname or ban dien dung mat khau",
        );
        return;
      }
    } else {
      await setDoc(
        doc(
          db,
          `${ActionType.GAMES}/${gameId}/${ActionType.GAMEPLAYERS}/${newId}`,
        ),
        player,
      );
      localStorage.setItem(
        "playerLogin",
        `${ActionType.GAMES}/${gameId}/${ActionType.GAMEPLAYERS}/${newId}`,
      );
    }
    localStorage.setItem("gameId", gameId);
    localStorage.setItem("nickname", player.nickname);

    toast.success(
      "Ban da dang nhap thanh cong!",
    );
    router.push("/player/game");
  };

  const loadingGamePlayer = async () => {
    const playerLogin = localStorage.getItem("playerLogin");
    const d = doc(db, `${playerLogin}`);
    const snapshot = await getDoc(d);
    console.log({ snapshot });
  };

  const deleteGamePlayer = async (gameId: string, playerId: string) => {
    if (gameId !== "" && playerId !== "") {
      await deleteDoc(
        doc(db, ActionType.GAMES, gameId, ActionType.GAMEPLAYERS, playerId),
      );
    }
  };

  return {
    players,
    loadGamePlayers,
    createGamePlayer,
    loadingGamePlayer,
    deleteGamePlayer,
  };
};
