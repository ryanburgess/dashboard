var React = require('react');
var MonthDay = require('./date');
var Day = require('./day');
var Clock = require('./clock');
var Temp = require('./temp');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <MonthDay />
        <Day />
        <Clock />
        <Temp />
      </div>
    );
  }
});

module.exports = App;

