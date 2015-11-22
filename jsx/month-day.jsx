import React from 'react';
let update = 0;

const MonthDay = React.createClass({
  getInitialState() {
    return {};
  },
  componentDidMount() {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date();
    let month = monthNames[d.getMonth()];
    let day = d.getDate();
    this.setState({month: month, day: day});
  },
  render() {

    // run update
    if(this.props.dayUpdate > update){
      update = this.props.dayUpdate;
      this.componentDidMount();
    }

    return (
      <p className='month-day'>{this.state.month}, {this.state.day}</p>
    );
  }
});

module.exports = MonthDay;