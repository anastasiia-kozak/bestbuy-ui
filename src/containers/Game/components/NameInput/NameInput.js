import React from 'react';
import './Styles.css'

class NameInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };
  }

  handleInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return <div>
      <h5>Enter your Name to start the Game:</h5>
      <input onChange={(e) => this.handleInput(e)} value={this.state.input} placeholder={"Name"}/>
      <button className={"grd-button"} onClick={() => this.props.onSave(this.state.input)}>Save</button>
    </div>
  }
}

export default NameInput;
