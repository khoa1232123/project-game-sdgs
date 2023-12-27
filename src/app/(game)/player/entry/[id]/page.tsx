"use client";
import { db } from "@/configs/firebase";
import { ActionType, GamePlayerType } from "@/contants/type";
import { Game } from "@/entities/Game";
import { useGamePlayers } from "@/hooks/useGamePlayers";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { Button, TextField } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const PlayerEntryPage = (props: Props) => {
  const { id } = useParams();
  const { createGamePlayer } = useGamePlayers();
  const [game, setGame] = useState<Game>();
  const [player, setPlayer] = useState<GamePlayerType>({
    nickname: "",
    password: "",
  });

  useEffect(() => {
    if (id && typeof id === "string") {
      const q = query(
        collection(db, ActionType.GAMES),
        where("playerUrlHash", "==", id),
      );
      getDocs(q).then((snapshot) => {
        const doc: any = snapshot.docs[0];
        setGame({
          ...doc.data(),
          id: doc.id,
        });
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (game?.id) {
      createGamePlayer(game.id, player);
    }
  };

  return (
    <div className="flex-center h-full">
      <header>
        <title>Player login</title>
      </header>
      <div className="max-w-[500px] px-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold">Player login</h2>
          <TextField
            name="nickname"
            type="text"
            className="!mt-4 w-full"
            label="Nick name"
            size="small"
            onChange={handleChange}
            value={player.nickname}
          />
          <TextField
            name="password"
            type="password"
            className="!mt-4 w-full"
            label="Password"
            size="small"
            onChange={handleChange}
            value={player.password}
          />
          <Button
            variant="contained"
            type="submit"
            className="!mt-4 w-full bg-blue-500"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PlayerEntryPage;
