var React = require('react');

var SetIntervalMixin = {
  componentWillMount: function componentWillMount() {
    this.intervals = [];
  },

  componentWillUnmount: function componentWillUnmount() {
    this.intervals.map(clearInterval);
  },

  setInterval: (function (_setInterval) {
    function setInterval() {
      return _setInterval.apply(this, arguments);
    }

    setInterval.toString = function () {
      return _setInterval.toString();
    };

    return setInterval;
  })(function () {
    this.intervals.push(setInterval.apply(null, arguments));
  })
};

var Day = React.createClass({
  mixins: [SetIntervalMixin],
  componentDidMount: function componentDidMount() {
    this.setInterval(this.tick, 1000);
  },
  tick: function tick() {
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
    this.setState({ day: day });
  },
  render: function() {
    
    return (
      <p className='day'>{day}</p>
    );
  }
});

module.exports = Day;