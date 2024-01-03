import DetailGamePlayer from "@/components/DetailGame/DetailGamePlayer";
import { Game } from "@/entities/Game";
import { useGamePlayers } from "@/hooks/useGamePlayers";
import { useGames } from "@/hooks/useGames";
import { getPlayerUrl } from "@/untils/gameUntils";
import { FormControl } from "@mui/base";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: (e: boolean) => void;
  game?: Game;
};

const FaciliDetailGameModal = ({ open, setOpen, game }: Props) => {
  const [title, setTitle] = useState<string>("");
  const { updateGame } = useGames();
  const { loadGamePlayers, players } = useGamePlayers();

  useEffect(() => {
    setTitle(game?.title || "");
  }, [game?.title]);

  useEffect(() => {
    if (game?.id) {
      loadGamePlayers(game?.id);
    }
  }, [game?.id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateGame = async () => {
    if (!game?.id) return;
    if (title === "") {
      toast.error("thieu title");
      return;
    }
    await updateGame({
      id: game?.id,
      title: title,
    });
    toast.success("save success");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = e.target.value;

    setTitle(value);
  };

  const handleCopy = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast("Copy success!");
    } catch (error) {
      console.error("Failed to copy link to clipboard:", error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="pb-0">
          Detail Game
        </DialogTitle>
        <DialogContent className="min-w-[600px]">
          <div className="detail-game-modal__header mt-2">
            <div className="mb-4 flex items-end gap-4">
              <FormGroup className="w-1/2">
                <FormControl>
                  <TextField
                    name="title"
                    label="Title"
                    value={title}
                    onChange={handleChange}
                    size="small"
                    className="w-full"
                  />
                </FormControl>
              </FormGroup>
              <div className="w-1/2 text-center">
                <Button
                  variant="contained"
                  color="success"
                  className="w-full bg-green-500"
                  onClick={handleUpdateGame}
                >
                  Save Change
                </Button>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <FormGroup className="w-1/2">
                <FormControl>
                  <TextField
                    disabled
                    label="Link Player"
                    value={getPlayerUrl(game)}
                    size="small"
                    className="w-full"
                  />
                </FormControl>
              </FormGroup>
              <div className="flex w-1/2 gap-4 text-center">
                <Button
                  variant="contained"
                  color="primary"
                  className="w-full bg-blue-500"
                  onClick={() => handleCopy(getPlayerUrl(game))}
                >
                  Copy
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  className="w-full bg-red-500"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div className="detail-game-modal__content">
            <h3 className="mt-2">Player List</h3>
            <div className="max-h-[400px] overflow-auto">
              {players && players?.length > 0 ? (
                players?.map((player, index) => (
                  <DetailGamePlayer
                    key={player.id}
                    stt={index + 1}
                    player={player}
                    gameId={game?.id || ""}
                  />
                ))
              ) : (
                <p className="text-center">Not Player</p>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Link target="_blank" href={'/facili/game/' + game?.id}>
            <Button variant="contained" className="bg-blue-500">
              Go to game admin page
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FaciliDetailGameModal;
