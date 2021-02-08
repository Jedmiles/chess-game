import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';

function Board({position, handleMove, colour}){
    let chess;
    let [
        squareStyles,
        setSquareStyles
    ] = useState({});
    let [
        clickedSquare,
        setClickedSquare
    ] = useState(null);

    useEffect(() => {
        chess = new Chess();
        chess.load(position);
    })

    const highlightSquares = (source, squares) => {
        let highlightedSquares
            highlightedSquares = squares.reduce((a, b) => {
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
        if (chess.turn() === colour[0]) {
            if (clickedSquare) {
                console.log(clickedSquare);
                const move = chess.move({ from: clickedSquare, to: sourceSquare, promotion: 'q' });
                if (move) {
                    setClickedSquare(null);
                    handleMove(chess.fen())
                }
            }
            else {
                setClickedSquare(sourceSquare);
            }
        }
        highlightSquares(sourceSquare, chess.moves({ square: sourceSquare, verbose: true }));
        setClickedSquare(sourceSquare);
    };

    return (
        <div className="App">
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
