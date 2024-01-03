"use client";
import Wrapper from "@/components/Wrapper";
import { Game } from "@/entities/Game";
import { useGames } from "@/hooks/useGames";
import FaciliDetailGameModal from "@/modals/FaciliDetailGameModal";
import FaciliNewGameFormModal from "@/modals/FaciliNewGameFormModal";
import { getPlayerUrl } from "@/untils/gameUntils";
import { ContentCopy, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const FaciliGameList = (props: Props) => {
  const [game, setGame] = useState<Game>();
  const { games, deleteGame } = useGames();
  const [showEditModal, setshowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  function showModalForNewGame(event: any) {
    setShowCreateModal(true);
  }

  const showGameDetail = (game: Game) => {
    setGame(game);
    setshowEditModal(true);
  };

  const handleCopy = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast("Copy success!");
    } catch (error) {
      console.error("Failed to copy link to clipboard:", error);
    }
  };

  const handleDelete = async (gameId: string) => {
    if (!gameId) return;
    try {
      const conf = confirm("Do you want to delete this game?")
      if (conf) {
        await deleteGame(gameId);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  <td className="text-center">{games.length - index}</td>
                  <td
                    data-game_id={item.id}
                    onClick={() => showGameDetail(item)}
                    className="text-center"
                    style={{ cursor: "pointer" }}
                  >
                    <span>{item.title}</span>
                  </td>
                  <td>{getPlayerUrl(item)}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="contained"
                        color="info"
                        className="min-w-[40px] rounded-full bg-blue-500 px-0"
                        data-copied_text={getPlayerUrl(item)}
                        onClick={() => handleCopy(getPlayerUrl(item))}
                      >
                        <ContentCopy />
                      </Button>
                      <Button
                        onClick={() => handleDelete(item?.id || "")}
                        variant="contained"
                        color="error"
                        className="min-w-[40px] rounded-full bg-red-500 px-0"
                      >
                        <Delete />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FaciliNewGameFormModal
        open={showCreateModal}
        setOpen={setShowCreateModal}
      />

      <FaciliDetailGameModal
        open={showEditModal}
        setOpen={setshowEditModal}
        game={game}
      />
    </Wrapper>
  );
};

export default FaciliGameList;
