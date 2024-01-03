import { GamePlayer } from "@/entities/GamePlayer";
import { useGamePlayers } from "@/hooks/useGamePlayers";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

type Props = {
  player: GamePlayer;
  stt: number;
  gameId: string;
};

const DetailGamePlayer = ({ player, stt, gameId }: Props) => {
  const { deleteGamePlayer } = useGamePlayers();

  const handleDelete = async (playerId: string) => {
    if (!gameId || !playerId) return;
    try {
      const conf = confirm("Do you want to delete this game?");
      if (conf) {
        await deleteGamePlayer(gameId || "", playerId || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        <div>{stt}</div>
        <div>{player.nickname}</div>
      </div>
      <Button onClick={() => handleDelete(player.id || "")}>
        <Delete color="error" className="color-red-500" />
      </Button>
    </div>
  );
};

export default DetailGamePlayer;
