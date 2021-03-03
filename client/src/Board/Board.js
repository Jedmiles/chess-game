import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import Chess from "chess.js";
import PropTypes from "prop-types";
import Promoter from "../Promoter";

function Board({ position, handleMove, colour }) {
  const colourBackRows = { white: 8, black: 1 };
  const colours = { w: "White", b: "Black" };

  let chess;
  const [squareStyles, setSquareStyles] = useState({});
  const [clickedSquare, setClickedSquare] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [promotionSquare, setPromotionSquare] = useState(null);
  const [isPromoting, setIsPromoting] = useState(false);
  const [turn, setTurn] = useState(null);
  const [inCheck, setInCheck] = useState(false);

  useEffect(() => {
    chess = new Chess();
    chess.load(position);
    setTurn(chess.turn());
    setInCheck(chess.turn() === colour[0] && chess.in_check());
  });

  const highlightSquares = (source, squares) => {
    /* eslint-disable no-param-reassign */
    const highlightedSquares = squares.reduce((a, b) => {
      if (chess.turn() === colour[0]) {
        a[b.to] = {
          background: "radial-gradient(circle, #A9A9A9 20%, transparent 25%)",
          borderRadius: "50%",
        };
      }
      return a;
    }, {});
    /* eslint-enable no-param-reassign */
    highlightedSquares[source] = { backgroundColor: "yellow" };
    setSquareStyles(highlightedSquares);
  };

  useEffect(() => {
    if (promotion === null) {
      return;
    }
    chess.move({ from: clickedSquare, to: promotionSquare, promotion });
    setClickedSquare(null);
    handleMove(chess.fen());
    highlightSquares(
      promotionSquare,
      chess.moves({ square: promotionSquare, verbose: true })
    );
    setClickedSquare(promotionSquare);
    setIsPromoting(false);
    setPromotion(null);
  }, [promotion]);

  const willPromote = (sourceSquare) => {
    const clickedSquareState = chess.get(clickedSquare);
    const clickedRow = parseInt(sourceSquare[1], 10);
    const sourceRow = parseInt(clickedSquare[1], 10);
    return (
      clickedSquareState !== null &&
      clickedSquareState.type === "p" &&
      colour[0] === clickedSquareState.color &&
      colourBackRows[colour] === clickedRow &&
      (sourceRow + 1 === colourBackRows[colour] ||
        sourceRow - 1 === colourBackRows[colour])
    );
  };

  const onSquareClick = (sourceSquare) => {
    if (isPromoting) {
      return;
    }
    if (chess.turn() === colour[0]) {
      if (clickedSquare !== null) {
        if (willPromote(sourceSquare)) {
          setIsPromoting(true);
          setPromotionSquare(sourceSquare);
          return;
        }
        const move = chess.move({ from: clickedSquare, to: sourceSquare });
        if (move) {
          setClickedSquare(null);
          handleMove(chess.fen());
        }
      }
    }
    highlightSquares(
      sourceSquare,
      chess.moves({ square: sourceSquare, verbose: true })
    );
    setClickedSquare(sourceSquare);
  };

  return (
    <div>
      {isPromoting && <Promoter setPromotion={setPromotion} />}
      <div>{`${colours[turn]} to move.`}</div>
      {inCheck && <div>Check</div>}
      <Chessboard
        position={position}
        onSquareClick={onSquareClick}
        draggable={false}
        squareStyles={squareStyles}
        orientation={colour}
      />
    </div>
  );
}

Board.propTypes = {
  position: PropTypes.string.isRequired,
  handleMove: PropTypes.func.isRequired,
  colour: PropTypes.string.isRequired,
};

export default Board;
