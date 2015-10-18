const React = require('react');
const MonthDay = require('react-month-day');
const Day = require('./day');
const Clock = require('./clock');
const Temp = require('./temp');
const Tasks = require('./tasks');
const MLB = require('./mlb');
const getDay = require('./get-day');
const renderTime = require('./time');
const api = require('../key.json');
var currentDay;
var currentHour;

// tempuratur API
var tempurature;
function getTemp() {
  let city = api.city;
  city = city.replace(/ /g, '_');
  let request = new XMLHttpRequest();
  request.open('GET', 'http://api.wunderground.com/api/'+ api.weather +'/conditions/q/CA/'+ city +'.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
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

