var React = require('react');
var MonthDay = require('react-month-day');
var Day = require('./day');
var Clock = require('./clock');
var Temp = require('./temp');
var Tasks = require('./tasks');
var MLB = require('./mlb');
var getDay = require('./get-day');
var renderTime = require('./time');
var api = require('../key.json');
var currentDay;
var currentHour;

// tempuratur API
var tempurature;
function getTemp() {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://api.wunderground.com/api/'+ api.weather +'/conditions/q/CA/San_Francisco.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {

      let data = JSON.parse(request.responseText);
      console.log(data)
      let temp = data.current_observation.temp_f;
      let weather = data.current_observation.weather;
      let feels = data.current_observation.feelslike_f;
      let icon = data.current_observation.icon_url;
      icon = icon.replace('http://icons.wxug.com/i/c/k/', 'public/img/weather/').replace('.gif', '.svg').replace('_', '-');
      temp = temp.toFixed(0);
      feels = Number(feels).toFixed(0);

      tempurature = {
        temp: temp,
        weather: weather,
        feels: 'Feels like ' + feels,
        icon: icon
      }
      return tempurature;
    }
  };
  request.send();
}

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

var App = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState() {
    return {day: getDay()};
  },
  componentDidMount() {
    this.setInterval(this.tick, 1000);
  },
  tick() {
    let today = getDay();
    let time = renderTime();

    if(tempurature !== undefined){
      this.setState({temp: tempurature.temp, weather: tempurature.weather, degree: '°F', feels: tempurature.feels, icon: tempurature.icon});
    }

    // make calls by the day change
    if(today !== currentDay || currentDay === undefined){
      currentDay = today;
      this.setState({day: today});
    }

    // make calls by the hour change
    if(time.hours !== currentHour || currentHour === undefined){
      currentHour = time.hours;
      getTemp();
    }

    //set the state
    this.setState({hours: time.hours, minutes: time.minutes, seconds: time.seconds, diem: time.diem});
  },
  render() {
    return (
      <div>
        <MonthDay />
        <Day day={this.state.day} />
        <Clock hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds} diem={this.state.diem} />
        <Temp temp={this.state.temp} weather={this.state.weather} degree={this.state.degree} feels={this.state.feels} icon={this.state.icon} />
        <Tasks day={this.state.day} />
        <MLB />
      </div>
    );
  }
});

module.exports = App;

