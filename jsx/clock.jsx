import React from 'react';

const Clock = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  render() {
    const {hours, minutes, seconds, diem} = this.props;
    return (
      <p className='clock'>
        {hours}:{minutes}:{seconds}
        <span className='diem'>{diem}</span>
      </p>
    );
  }
});

module.exports = Clock;