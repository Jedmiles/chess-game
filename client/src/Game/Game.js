import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import Board from '../Board';
import {Redirect} from 'react-router-dom';

let socket;

const Game = ({location}) => {
  const ENDPOINT = 'localhost:5000/api/game';

  let room = location.pathname.split('/')[2];
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
  }, [room])
  
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