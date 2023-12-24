import { Game } from "@/entities/Game";
import { useCurrentUser } from "@/hooks";
import { useGames } from "@/hooks/useGames";
import { FormControl } from "@mui/base";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (e: boolean) => void;
  game?: Game;
};

const FaciliDetailGameModal = ({ open, setOpen, game }: Props) => {
  const [title, setTitle] = useState<string>();
  const { user } = useCurrentUser();
  const { createGame } = useGames();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateGame = async () => {
    if (title) {
      createGame(title);
      handleClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = e.target.value;

    setTitle(value);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Detail Game</DialogTitle>
        <DialogContent className="min-w-[500px]">
          <div className="detail-game-modal__header">
            <FormGroup>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <TextField
                  placeholder="Title"
                  name="title"
                  value={game?.title}
                  onChange={handleChange}
                  size="small"
                />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Link Player</FormLabel>
              <FormControl>
                <TextField
                  placeholder="Link Player"
                  disabled
                  value={game?.playerUrlHash}
                  size="small"
                />
              </FormControl>
            </FormGroup>
          </div>
          <div className="detail-game-modal__content"></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={handleCreateGame}
            variant="contained"
            autoFocus
            className="bg-blue-500"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FaciliDetailGameModal;
