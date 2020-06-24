import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import './app.css';
import { Game } from '../game/game';
import { Leaderboards } from '../leaderboards/leaderboards';
import { NewPlayerForm } from '../player/new-player-form';
import history from '../history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/leaderboards">
            <Leaderboards />
          </Route>
          <Route path="/">
            <NewPlayerForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
