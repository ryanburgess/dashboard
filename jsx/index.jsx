var React = require('react');
var MonthDay = require('react-month-day');
var Day = require('./day');
var Clock = require('react-clock');
var Temp = require('./temp');
var Tasks = require('./tasks');
var MLB = require('./mlb');
var getDay = require('./get-day');

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

var App = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState() {
    return {day: getDay()};
  },
  componentDidMount() {
    this.setInterval(this.tick, 1000);
  },
  tick() {
    this.setState({day: getDay()});
  },
  render() {
    return (
      <div>
        <MonthDay />
        <Day day={this.state.day} />
        <Clock />
        <Temp />
        <Tasks day={this.state.day} />
        <MLB />
      </div>
    );
  }
});

module.exports = App;

