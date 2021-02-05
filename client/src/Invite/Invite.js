import {Link} from 'react-router-dom';

const Invite = () => {

  return (
    <div>
      <Link to={`/game/${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)}`}>
        <button>
          Create Game
        </button>
      </Link>
    </div>
  )
}

export default Invite;