import React from 'react';
import "./styles.css"

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leaderboard: []
    };

    this.fetchFromApi();
  }

  fetchFromApi() {
    fetch('http://localhost:3001/leaderboard')
      .then(response => response.json())
      .then((leaderboard) => {
        leaderboard = leaderboard.sort((a, b) => {
          return parseInt(b.datetime) - parseInt(a.datetime);
        });
        console.log('leader', leaderboard);

        this.setState({
          leaderboard
        });
      });
  }

  renderRecord(record) {
    return <tr key={record.uuid}>
      <td>{record.winner}</td>
      <td>{record.players}</td>
      <td>{new Date(parseInt(record.datetime)).toLocaleString()}</td>
    </tr>
  }

  render() {
    return (<div>
      <h1 className={"pb-2"}>Winner table</h1>
      <table >
        <thead>
          <tr>
            <th>Winner</th>
            <th>Players</th>
            <th>Datetime</th>
          </tr>
        </thead>
        <tbody>
         {this.state.leaderboard.map((record) => this.renderRecord(record))}
        </tbody>
      </table>
    </div>);
  }
}

export default Leaderboard;
