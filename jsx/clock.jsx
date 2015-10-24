import React from 'react';

const Clock = React.createClass({
  render() {
    return (
      <p className='clock'>
        {this.props.hours}:{this.props.minutes}:{this.props.seconds}
        <span className='diem'>{this.props.diem}</span>
      </p>
    );
  }
});

module.exports = Clock;