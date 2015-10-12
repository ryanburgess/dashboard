var React = require('react');
var MonthDay = require('react-month-day');
var Day = require('./day');
var Clock = require('react-clock');
var Temp = require('./temp');
var Tasks = require('./tasks');
var MLB = require('./mlb');

var App = React.createClass({
  render() {
    return (
      <div>
        <MonthDay />
        <Day />
        <Clock />
        <Temp />
        <Tasks />
        <MLB />
      </div>
    );
  }
});

module.exports = App;

