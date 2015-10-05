var React = require('react');
var daily = require('../daily.json');
var getDay = require('./get-day');

var SetIntervalMixin = {
  componentWillMount: function componentWillMount() {
    this.intervals = [];
  },

  componentWillUnmount: function componentWillUnmount() {
    this.intervals.map(clearInterval);
  },

  setInterval: (function (_setInterval) {
    function setInterval() {
      return _setInterval.apply(this, arguments);
    }

    setInterval.toString = function () {
      return _setInterval.toString();
    };

    return setInterval;
  })(function () {
    this.intervals.push(setInterval.apply(null, arguments));
  })
};

var Tasks = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState() {
    return {day: getDay()};
  },
  componentDidMount() {
    this.setInterval(this.tick, 1000);
  },
  tick() {
    this.setState({day: getDay()});
  },
  render() {
    let today = this.state.day;
    return (
      <ul className='tasks'>
        {daily.map(function(item, i){
          if(item.day === today || item.day === 'All'){
            let image = 'public/img/tasks/' + item.img;
            return <li key={i}>{item.task} <img src={image} /></li>;
          }
        })}
      </ul>
    );
  }
});

module.exports = Tasks;