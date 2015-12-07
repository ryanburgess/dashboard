import React from 'react';
let update = 0;
const Day = React.createClass({
  displayName: 'Day',
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const d = new Date();
    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    const day = weekday[d.getDay()];

    this.setState({ day });
  },
  render() {
    const { dayUpdate } = this.props;
    // run update
    if(dayUpdate > update) {
      update = dayUpdate;
      this.componentDidMount();
    }

    return (
      <p className='day'>{ this.state.day }</p>
    );
  }
});

module.exports = Day;