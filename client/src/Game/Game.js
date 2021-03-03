import io from "socket.io-client";
import { React, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Board from "../Board";

let socket;

const Game = ({ location }) => {
  const ENDPOINT = "localhost:5000/api/game";

  const room = location.pathname.split("/")[2];
  const [position, setPosition] = useState("start");
  const [colour, setColour] = useState(null);
  const [isFull, setIsFull] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", room, (err) => {
      setIsFull(err.isFull);
    });
    socket.on("start", (pieceColour) => {
      // Might have to change back to colour, or change on server
      setColour(pieceColour);
    });
  }, [room]);

  useEffect(() => {
    socket.emit("move", position);
  }, [position]);

  useEffect(() => {
    socket.on("update", (pos) => {
      setPosition(pos);
    });
  }, []);

  useEffect(() => {
    socket.on("game over", () => {
      setGameOver(true);
    });
  });

  return (
    <div>
      {isFull || gameOver ? (
        <Redirect to="/" />
      ) : (
        colour !== null && (
          <Board position={position} handleMove={setPosition} colour={colour} />
        )
      )}
    </div>
  );
};

Game.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Game;
