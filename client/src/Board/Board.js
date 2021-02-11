import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import Promoter from '../Promoter';

function Board({position, handleMove, colour}){

    const colourBackRows = {'white': 8, 'black': 1}
    const colours = {'w': 'White', 'b': 'Black'}

    let chess;
    let [
        squareStyles,
        setSquareStyles
    ] = useState({});
    let [
        clickedSquare,
        setClickedSquare
    ] = useState(null);
    let [promotion, setPromotion] = useState(null);
    let [promotionSquare, setPromotionSquare] = useState(null);
    let [isPromoting, setIsPromoting] = useState(false);
    let [turn, setTurn] = useState(null);

    useEffect(() => {
        chess = new Chess();
        chess.load(position);
        setTurn(chess.turn());
    });

    useEffect(() => {
        console.log(promotion);
        if (promotion === null) {
            return;
        }
        chess.move({from: clickedSquare, to: promotionSquare, promotion: promotion});
        setClickedSquare(null);
        handleMove(chess.fen());
        highlightSquares(promotionSquare, chess.moves({ square: promotionSquare, verbose: true }));
        setClickedSquare(promotionSquare);
        setIsPromoting(false);
        setPromotion(null);
    }, [promotion])

    const highlightSquares = (source, squares) => {
        let highlightedSquares = squares.reduce((a, b) => {
            if (chess.turn() === colour[0]) {
                a[b.to] = {
                    background   : 'radial-gradient(circle, #A9A9A9 20%, transparent 25%)',
                    borderRadius : '50%'
                };
            }
            return a;
        }, {});
        highlightedSquares[source] = { backgroundColor: 'yellow' };
        setSquareStyles(highlightedSquares);
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
                const move = chess.move({ from: clickedSquare, to: sourceSquare});
                if (move) {
                    setClickedSquare(null);
                    handleMove(chess.fen())
                }
            }
        }
        highlightSquares(sourceSquare, chess.moves({ square: sourceSquare, verbose: true }));
        setClickedSquare(sourceSquare);
    };

    const willPromote = (sourceSquare) => {
        let clickedSquareState = chess.get(clickedSquare);
        let clickedRow = parseInt(sourceSquare[1]);
        let sourceRow = parseInt(clickedSquare[1]);
        return clickedSquareState !== null && clickedSquareState['type'] === 'p'&& colour[0] === clickedSquareState['color'] && colourBackRows[colour] === clickedRow && (sourceRow + 1 === colourBackRows[colour] || sourceRow - 1 === colourBackRows[colour]);
    }

    return (
        <div>
            {isPromoting && <Promoter setPromotion={setPromotion}/>}
            <div>
                {`${colours[turn]} to move.`}
            </div>
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

export default Board;
