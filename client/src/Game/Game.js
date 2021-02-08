import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import Board from '../Board';
import Chess from 'chess.js';
import {Redirect} from 'react-router-dom';

let socket;

const Game = ({location}) => {
  const ENDPOINT = '/api/game'

  let [room, setRoom] = useState(location.pathname.split('/')[2])
  let [position, setPosition] = useState('start');
  let [colour, setColour] = useState(null);
  let [isFull, setIsFull] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', room, (err) => {
        setIsFull(err.isFull);
    });
    socket.on('start', (colour) => {
      setColour(colour);
    })
  }, [])
  
  useEffect(() => {
    socket.emit('move', position)
  }, [position])
  
  useEffect(() => {
    socket.on('update', (pos) => {
      setPosition(pos);
    })
  }, [])

  return (
    <div>
      {isFull ? <Redirect to="/"/> : (colour !== null && <Board position={position} handleMove={setPosition} colour={colour}/>)}
    </div>
  )
}

export default Game;