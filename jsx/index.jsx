import React from 'react';
import MonthDay from './month-day';
import Day from './day';
import Clock from './clock';
import Temp from './temp';
import Tasks from './tasks';
import MLB from './mlb';
import getDay from './get-day';
import renderTime from './time';
import Stock from './stock';
import Flickr from './flickr';
import Menu from './menu';
import config from '../config.json';

let currentDay;
let currentHour;
let hourUpdate = 0;
let dayUpdate = 0;

// use a set interval mixin for timer
const SetIntervalMixin = {
  componentWillMount: function componentWillMount() {
    this.intervals = [];
  },

  componentWillUnmount: function componentWillUnmount() {
    this.intervals.map(clearInterval);
  },

  setInterval: (function(_setInterval) {
    function setInterval() {
      return _setInterval.apply(this, arguments);
    }

    setInterval.toString = function() {
      return _setInterval.toString();
    };

    return setInterval;
  })(function() {
    this.intervals.push(setInterval.apply(null, arguments));
  })
};

// main react app class
const App = React.createClass({
  displayName: 'MorningDashboard',
  mixins: [SetIntervalMixin],
  getInitialState() {
    return { day: getDay(), daily: config.tasks, stock: config.stock.symbol, city: config.settings.city,
      degree: config.settings.degree, weatherApi: config.api.weather, flickrApi: config.api.flickr };
  },
  componentDidMount() {
    this.setInterval(this.tick, 1000);
  },
  tick() {
    const today = getDay();
    const time = renderTime();
    // make calls by the day change
    if(today !== currentDay || currentDay === undefined) {
      dayUpdate++;
      currentDay = today;
      this.setState({ day: today, daily: config.tasks, dayUpdate });
    }
    // make calls by the hour change
    if(time.hours !== currentHour || currentHour === undefined) {
      hourUpdate++;
      currentHour = time.hours;
      this.setState({ hourUpdate });
    }
    //set the state
    this.setState({ hours: time.hours, minutes: time.minutes, seconds: time.seconds, diem: time.diem });
  },
  render() {
    return (
      <Flickr hourUpdate={ this.state.hours } city={ this.state.city } api={ this.state.flickrApi }>
        <div className='content'>
          <Menu city={ this.state.city } degrees={ this.state.degree } />
          <MonthDay dayUpdate={ this.state.dayUpdate } />
          <Day dayUpdate={ this.state.dayUpdate } />
          <Clock hours={ this.state.hours } minutes={ this.state.minutes }
          seconds={this.state.seconds} diem={ this.state.diem } />
          <Temp city={ this.state.city } degree={ this.state.degree } api={ this.state.weatherApi }
          hourUpdate={ this.state.hourUpdate } />
          <Tasks day={this.state.day } daily={ this.state.daily} dayUpdate={ this.state.dayUpdate } />
          <MLB day={ this.state.day } dayUpdate={ this.state.dayUpdate } />
          <Stock stock={ this.state.stock } hourUpdate={ this.state.hourUpdate } />
        </div>
      </Flickr>
    );
  }
});

module.exports = App;