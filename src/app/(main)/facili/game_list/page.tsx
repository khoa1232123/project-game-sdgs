"use client";
import Wrapper from "@/components/Wrapper";
import { app, db } from "@/configs/firebase";
import { ActionType } from "@/contants/type";
import { Game } from "@/entities/Game";
import { useCurrentUser } from "@/hooks";
import { getPlayerUrl } from "@/untils/gameUntils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useState } from "react";

type Props = {};

const FaciliGameList = (props: Props) => {
  const { user } = useCurrentUser();
  const [game, setGame] = useState<Game>();
  const [games, setGames] = useState<Game[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const loads = async () => {
    const q = query(
      collection(db, ActionType.GAMES),
      where("facilitatorUid", "==", user?.uid),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    let games: Game[] = [];
    querySnapshot.forEach((item: any) => {
      games.push({ ...item.data() });
    });

    setGames(games);
  };

  const showModalForNewGame = (event: any) => {};

  const showGameDetail = (event: any) => {
    const gameId = event.currentTarget.dataset.game_id;
    const game = games.filter((game) => game.id === gameId)[0];
    setGame(game);
    setShowModal(true);
  };

  const handleCopy = (ev: any) => {
    var textarea = window.document.getElementsByTagName("textarea")[0];
    textarea.innerHTML = ev.target.dataset.copied_text;
    textarea.select();
    window.document.execCommand("copy");
    alert("Copied!!");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Wrapper>
      <div className="container">
        <Button onClick={showModalForNewGame}>Create a new world</Button>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name of world</th>
              <th>URL for players</th>
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
                    <button
                      data-copied_text={getPlayerUrl(item)}
                      onClick={handleCopy}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default FaciliGameList;
