var React = require('react');
var MonthDay = require('react-month-day');
var Day = require('./day');
var Clock = require('react-clock');
var Temp = require('./temp');
var Tasks = require('./tasks');

var App = React.createClass({
  render() {
    return (
      <div>
        <MonthDay />
        <Day />
        <Clock />
        <Temp />
        <Tasks />
      </div>
    );
  }
});

module.exports = App;

