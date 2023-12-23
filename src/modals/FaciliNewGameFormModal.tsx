import { db } from "@/configs/firebase";
import { ActionType } from "@/contants/type";
import { Game } from "@/entities/Game";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel,
  Input,
  TextField,
} from "@mui/material";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import { useCurrentUser } from "@/hooks";
import { useGames } from "@/hooks/useGames";

type Props = {
  open: boolean;
  setOpen: (e: boolean) => void;
};

const FaciliNewGameFormModal = ({ open, setOpen }: Props) => {
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
        <DialogTitle id="alert-dialog-title">{"Create New Game"}</DialogTitle>
        <DialogContent className="min-w-[500px]">
          <FormGroup>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Title"
                name="title"
                onChange={handleChange}
              />
            </FormControl>
          </FormGroup>
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

export default FaciliNewGameFormModal;
