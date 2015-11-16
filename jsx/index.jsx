import React from 'react';
import cheerio from 'cheerio';
import request from 'request';
import MonthDay from 'react-month-day';
import Day from './day';
import Clock from './clock';
import Temp from './temp';
import Tasks from './tasks';
import MLB from './mlb';
import getDay from './get-day';
import renderTime from './time';
import Stock from './stock';
var config;
var currentDay;
var currentHour;
var daily;

// get the config file
function load() {
  let request = new XMLHttpRequest();
  request.open('GET', 'config.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      config = data;
      daily = data.tasks;
    }
  };
  request.send();
}
load();

// tempuratur API
var tempurature;
function getTemp() {
  let city = config.settings.city;
  city = city.replace(/ /g, '_');
  let request = new XMLHttpRequest();
  request.open('GET', 'http://api.wunderground.com/api/'+ config.api.weather +'/conditions/q/CA/'+ city +'.json', true);

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

      // create tempurate object
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

// use a set interval mixin for timer
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

// main react app class
var App = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState() {
    return {day: getDay(), daily: ['']};
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

    if(stock !== undefined){
      this.setState({stock: stock.price, stock_symbol: stock.symbol, stock_previous: stock.previous, up_down: stock.up_down});
    }

    // make calls by the day change
    if(today !== currentDay || currentDay === undefined){
      currentDay = today;
      this.setState({day: today, daily: daily});
    }

    // make calls by the hour change
    if(time.hours !== currentHour || currentHour === undefined){
      currentHour = time.hours;
      //getStock();
      getTemp();
      // call latest version of config
      load();
      this.setState({daily: daily, stock: stock.price, stock_symbol: stock.symbol, stock_previous: stock.previous, up_down: stock.up_down});
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
        <Tasks day={this.state.day} daily={this.state.daily} />
        <MLB day={this.state.day} />
        <Stock stock="NFLX" />
      </div>
    );
  }
});

module.exports = App;


