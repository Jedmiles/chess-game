import io from 'socket.io-client';
import {useEffect, useState} from 'react'

let socket;

const Game = ({location}) => {
  const ENDPOINT = 'http://localhost:5000/game'

  let [room, setRoom] = useState(location.pathname.split('/')[2])

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('join', room);

    socket.on('start', (game, colour) => {
      console.log(game, colour);
    })

    return () => {
    }

  }, [location, ENDPOINT])

  return (
    <div>
      Hi
    </div>
  )
}

export default Game;