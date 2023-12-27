"use client";
import { useGamePlayers } from "@/hooks/useGamePlayers";
import React, { useEffect } from "react";

type Props = {};

const PlayerGamePage = (props: Props) => {
  const { loadingGamePlayer } = useGamePlayers();
  useEffect(() => {
    loadingGamePlayer();
  }, []);

  return <div>PlayerGamePage</div>;
};

export default PlayerGamePage;
