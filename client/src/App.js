import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Game from './Game';
import Invite from './Invite';

const App = () => (
  <React.Fragment>
    <Router>
      <Route path="/game/" component={Game} />
      <Route path="/" exact component={Invite}/>
    </Router>
  </React.Fragment>
)

export default App;