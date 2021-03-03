import React from "react-dom";
import { Link } from "react-router-dom";

const Invite = () => (
  <div>
    <Link
      to={`/game/${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(2, 10)}`}
    >
      <button type="button">Create Game</button>
    </Link>
  </div>
);

export default Invite;
