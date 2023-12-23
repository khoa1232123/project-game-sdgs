"use client";
import Wrapper from "@/components/Wrapper";
import { db } from "@/configs/firebase";
import { ActionType } from "@/contants/type";
import { Game } from "@/entities/Game";
import { useCurrentUser } from "@/hooks";
import { useGames } from "@/hooks/useGames";
import FaciliNewGameFormModal from "@/modals/FaciliNewGameFormModal";
import { getPlayerUrl } from "@/untils/gameUntils";
import { Button } from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";

type Props = {};

const FaciliGameList = (props: Props) => {
  const { user } = useCurrentUser();
  const [game, setGame] = useState<Game>();
  const { games, deleteGame } = useGames();
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalForNewGame = (event: any) => {
    setShowModal(true);
  };

  const showGameDetail = (event: any) => {
    const gameId = event.currentTarget.dataset.game_id;
    const game = games.filter((game) => game.id === gameId)[0];
    setGame(game);
    setShowModal(true);
  };

  const handleCopy = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Copied!!");
    } catch (error) {
      console.error("Failed to copy link to clipboard:", error);
    }
  };

  const handleDelete = async (gameId: string) => {
    if (!gameId) return;
    try {
      await deleteGame(gameId);
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ games });

  return (
    <Wrapper>
      <div className="container">
        <Button onClick={showModalForNewGame}>Create a new world</Button>
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name of world</th>
              <th>URL for players</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {games.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{games.length - index}</td>
                  <td data-game_id={item.id} onClick={showGameDetail}>
                    <span style={{ cursor: "pointer" }}>{item.title}</span>
                  </td>
                  <td>{getPlayerUrl(item)}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="info"
                      className="mr-2 bg-blue-500"
                      data-copied_text={getPlayerUrl(item)}
                      onClick={() => handleCopy(getPlayerUrl(item))}
                    >
                      Copy
                    </Button>
                    <Button
                      onClick={() => handleDelete(item?.id || "")}
                      variant="contained"
                      color="error"
                      className="bg-red-500"
                    >
                      Delete
                    </Button>
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FaciliNewGameFormModal open={showModal} setOpen={setShowModal} />
    </Wrapper>
  );
};

export default FaciliGameList;
