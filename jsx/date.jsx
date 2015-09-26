const React = require('react');

const MonthDay = React.createClass({
  render() {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date();
    let month = monthNames[d.getMonth()] + ', ' + d.getDate();
    return (
      <p className='date'>{month}</p>
    );
  }
});

module.exports = MonthDay;