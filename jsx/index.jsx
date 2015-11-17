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
let config;
let currentDay;
let currentHour;
let daily;
let stock_symbol;

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
    let request = new XMLHttpRequest();
    request.open('GET', 'config.json', true);

    request.onload = function() {
      let component = this;
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        config = data;
        daily = data.tasks;
        stock_symbol = config.stock.symbol;
      }
    };
    request.send();
    this.setInterval(this.tick, 1000);
  },
  tick() {
    let today = getDay();
    let time = renderTime();

    // make calls by the day change
    if(today !== currentDay || currentDay === undefined){
      currentDay = today;
      this.setState({day: today, daily: daily});
    }

    // make calls by the hour change
    if(time.hours !== currentHour || currentHour === undefined){
      currentHour = time.hours;
    }

    //set the state
    this.setState({hours: time.hours, minutes: time.minutes, seconds: time.seconds, diem: time.diem});
  },
  render() {
    return (
      <div>
        <MonthDay />
        <Day />
        <Clock hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds} diem={this.state.diem} />
        <Temp city="San_francisco" degree='F' api='837fa9da3834f77b' />
        <Tasks day={this.state.day} daily={this.state.daily} />
        <MLB day={this.state.day} />
        <Stock stock="NFLX" />
      </div>
    );
  }
});

module.exports = App;


