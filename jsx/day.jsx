import React from 'react';

const Day = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    let d = new Date();
    let weekday = new Array(7);
    weekday[0]=  'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    let day = weekday[d.getDay()];

    this.setState({day: day});
  },
  render: function() {
    return (
      <p className='day'>{this.state.day}</p>
    );
  }
});

module.exports = Day;