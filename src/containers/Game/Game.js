import React from 'react'
import Board from "./components/Board/Board";
import NameInput from "./components/NameInput/NameInput";
import './style.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: '',
      turn: 0,
      board: Array(9).fill(null),
      isPlayerTurn: true,
      isGameOver: false,
      winner: null
    };
  }

  handleSquareClick(i) {
    if (this.state.isGameOver || !this.state.isPlayerTurn || !this.state.playerName) {
      return;
    }

    const board = this.state.board;

    if (!board[i]) {
      board[i] = 'X';
      let isGameOver = false;

      let winner = checkWinner(board);
      if (winner) {
        isGameOver = true;
        winner = winner === 'X' ? this.state.playerName : 'Computer'
      } else if (this.state.turn + 1 === 9) {
        isGameOver = true;
        winner = 'Draw';
      }

      this.setState({
        board,
        isPlayerTurn: false,
        isGameOver,
        turn: this.state.turn + 1,
        winner
      });

      if (winner) {
        saveWinner(winner, this.state.playerName);
      } else {
        setTimeout(() => this.makeComputerTurn(), 100);
      }
    }
  }

  makeComputerTurn() {
    const board = this.state.board;
    if (board.indexOf(null) === -1) return;
    let rand = Math.floor(Math.random() * Math.floor(8));

    for (let i = rand; i < board.length; i++){
      if (board[i] === null){
        board[i] = 'O';
        let isGameOver = false;

        let winner = checkWinner(board);
        if (winner) {
          isGameOver = true;
          winner = winner === 'X' ? this.state.playerName : 'Computer'
        } else if (this.state.turn + 1 === 9) {
          isGameOver = true;
          winner = 'Draw';
        }


        this.setState({
          board,
          isPlayerTurn: true,
          isGameOver,
          turn: this.state.turn + 1,
          winner
        });

        if (winner) {
          saveWinner(winner, this.state.playerName);
        }

        return;
      }
      if (i === board.length - 1) {
        i = 0;
      }
    }
  }

  handleTryAgainButton() {
    this.setState({
      playerName: '',
      turn: 0,
      board: Array(9).fill(null),
      isPlayerTurn: true,
      isGameOver: false,
      winner: null
    });
  }

  render() {
    return (<div>
      <h1>Tic Tac Toe</h1>
      {!this.state.playerName && <NameInput onSave={(name) => this.setState({playerName: name})} />}

      {this.state.playerName && <div><span>Player name: {this.state.playerName}</span><br /></div>}

      <br /><br />

      {this.state.isGameOver && <div className={'game-over'}>
        <h2>Game Over</h2>
        <h4>Winner: {this.state.winner}</h4>
        <button className={"grd-button"} onClick={() => this.handleTryAgainButton()}>Try Again</button>
      </div>}

      <Board board={this.state.board} onClick={this.handleSquareClick.bind(this)}/>
    </div>);
  }
}

export default Game;


function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winner = null;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

function saveWinner(winner, player) {
  fetch('http://34.216.230.240:3001/leaderboard', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({winner, players: player + " VS Computer"})
  }).then(function(data) {
    console.log('response', data);
  });
}
