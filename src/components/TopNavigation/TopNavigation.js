import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./styles.css"

class TopNavigation extends React.Component {
  render() {
    return <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/game">Game</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>;
  }
}

export default TopNavigation;
