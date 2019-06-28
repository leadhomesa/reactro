import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 30
    };
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
      const { value } = this.state;
      const newValue = value > 95 ? value : value + 5;

      this.setState({ value: newValue });
    }, 100);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { value } = this.state;
    return (
      <progress className='nes-progress is-primary' value={value} max='100' />
    );
  }
}

export default ProgressBar;
