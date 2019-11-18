import React from 'react';
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Game from "../Game/Game";
import Leaderboard from "../Leaderboard/Leaderboard";
import "./styles.css"
import Footer from "../../components/Footer/Footer";

function App() {
  return (
    <Router>
      <TopNavigation />

      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/">
          <h1>Please make your selection</h1>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
