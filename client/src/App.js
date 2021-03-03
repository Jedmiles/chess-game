import React from "react";
import { Route, Switch } from "react-router-dom";
import Game from "./Game";
import Invite from "./Invite";

const App = () => (
  <div>
    <Switch>
      <Route path="/game/" component={Game} />
      <Route path="/" exact component={Invite} />
    </Switch>
  </div>
);

export default App;
