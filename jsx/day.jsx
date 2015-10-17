const React = require('react');

const Day = React.createClass({
  render: function() {
    let day = this.props.day;
    return (
      <p className='day'>{day}</p>
    );
  }
});

module.exports = Day;