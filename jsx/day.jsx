var React = require('react');

var Day = React.createClass({
  render: function() {
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
    return (
      <p className='day'>{day}</p>
    );
  }
});

module.exports = Day;