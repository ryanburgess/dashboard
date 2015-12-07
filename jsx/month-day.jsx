import React from 'react';
let update = 0;

const MonthDay = React.createClass({
  displayName: 'MonthDay',
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date();
    const month = monthNames[d.getMonth()];
    const day = d.getDate();
    this.setState({ month, day });
  },
  render() {

    // run update
    if(this.props.dayUpdate > update) {
      update = this.props.dayUpdate;
      this.componentDidMount();
    }

    return (
      <p className='month-day'>{ this.state.month }, { this.state.day }</p>
    );
  }
});

module.exports = MonthDay;