var React = require('react');
var output;
var SetIntervalMixin = {
  componentWillMount: function () {
    this.intervals = [];
  },

  componentWillUnmount: function () {
    this.intervals.map(clearInterval);
  },

  setInterval: function () {
    this.intervals.push(setInterval.apply(null, arguments));
  }
};

function renderTime() {
  var currentTime = new Date();
  var diem = 'AM';
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();
  var s = currentTime.getSeconds();

  if (h == 0) {
    h = 12;
  } else if (h > 12) { 
    h = h - 12;
    diem='PM';
  }

  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  output = {
    hours: h,
    minutes: m,
    seconds: s,
    diem: diem
  }
  return output;
}

var Clock = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function() {
    return {time: renderTime()};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000);
  },
  tick: function() {
    renderTime();
    this.setState({hours: output.hours, minutes: output.minutes, seconds: output.seconds, diem: output.diem});
  },
  render: function() {
    return (
      <p className='clock'>
        {this.state.hours}:{this.state.minutes}:{this.state.seconds}
        <span className='diem'>{this.state.diem}</span>
      </p>
    );
  }
});

module.exports = Clock;