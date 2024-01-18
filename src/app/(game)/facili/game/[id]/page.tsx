"use client";
import Facilitator from "@/components/FaciliGame/Facilitator";
import { useCurrentUser } from "@/hooks";
import { useGamePlayers } from "@/hooks/useGamePlayers";
import { Avatar } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const FaciliGamePage = (props: Props) => {
  const { user } = useCurrentUser();
  const { id } = useParams();
  const { loadGamePlayers, players } = useGamePlayers();

  useEffect(() => {
    if (!id) return;
    loadGamePlayers(id.toString());
  }, [id]);

  return (
    <div className="h-[100vh]">
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="w-1/3">
              <Facilitator user={user} />
            </div>
            <div className="w-1/3">
              <div className="card">helo</div>
            </div>
            <div className="w-1/3">
              <div className="card">helo</div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-2/3">
              <div className="card">
                <h3 className="text-xl font-bold">List Player</h3>

                <div className="">
                  {players?.map((player) => (
                    <div className="card max-w-[300px]" key={player.id}>
                      {player.nickname}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/6">
              <div className="card">hello</div>
            </div>

            <div className="w-1/6">
              <div className="card">hello</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaciliGamePage;
