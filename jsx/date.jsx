var React = require('react');

var MonthDay = React.createClass({
  render: function() {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date();
    var month = monthNames[d.getMonth()] + ', ' + d.getDate();
    return (
      <p className='date'>{month}</p>
    );
  }
});

module.exports = MonthDay;