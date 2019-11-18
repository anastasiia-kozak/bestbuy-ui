import React from 'react';
import './style.css';

class Square extends React.Component {
  render() {
    return (<button onClick={() => this.props.onClick()} className={'square ' + 'color-' + this.props.value}>{this.props.value}</button>);
  }
}

export default Square;
