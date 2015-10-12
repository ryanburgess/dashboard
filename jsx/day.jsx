var React = require('react');

var Day = React.createClass({
  render: function() {
    var day = this.props.day;
    return (
      <p className='day'>{day}</p>
    );
  }
});

module.exports = Day;