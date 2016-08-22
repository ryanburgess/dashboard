import React from 'react';
import MonthDay from './month-day';
import Day from './day';
import Clock from './clock';
import Temp from './temp';
import MLB from './mlb';
import getDay from './get-day';
import renderTime from './time';
import Stock from './stock';
import Flickr from './flickr';
import Menu from './menu';
import config from '../config.json';
import storage from './local-storage';

let currentDay;
let currentHour;
let currentFif;
let hourUpdate = 0;
let dayUpdate = 0;
let fifteenUpdate = 0;

// set storage of settings
storage(config.settings.city, config.settings.state, config.settings.degree, config.stock.symbol, 'photos');

// stored settings
const storedItems = {
  'city': localStorage.getItem('city'),
  'state': localStorage.getItem('state'),
  'degrees': localStorage.getItem('degrees'),
  'stock': localStorage.getItem('stock'),
  'backgroundType': localStorage.getItem('backgroundType')
};

// use a set interval mixin for timer
const SetIntervalMixin = {
  componentWillMount() {
    this.intervals = [];
  },

  componentWillUnmount() {
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
    return { day: getDay(), stock: storedItems.stock, city: storedItems.city,
      state: storedItems.state, degree: storedItems.degrees, weatherApi: config.api.weather,
       flickrApi: config.api.flickr, backgroundType: storedItems.backgroundType };
  },
  componentDidMount() {
    this.setInterval(this.tick, 1000);
  },
  tick() {
    const today = getDay();
    const time = renderTime();
    const mins = Number(time.minutes);

    // make calls every 30 minutes
    if((mins === 59 || mins === 30 || currentFif === undefined) && currentFif !== mins) {
      fifteenUpdate++;
      currentFif = mins;
      this.setState({ fifteen: fifteenUpdate });
    }

    // make calls by the day change
    if(today !== currentDay || currentDay === undefined) {
      dayUpdate++;
      currentDay = today;
      this.setState({ day: today, dayUpdate });
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
      <Flickr hourUpdate={ this.state.fifteen } city={ this.state.city } api={ this.state.flickrApi }
       backgroundType={ this.state.backgroundType }>
        <div className='content'>
          <Menu city={ this.state.city } state={ this.state.state } degrees={ this.state.degree }
           stock={ this.state.stock } backgroundType={ this.state.backgroundType } />
          <MonthDay dayUpdate={ this.state.dayUpdate } />
          <Day dayUpdate={ this.state.dayUpdate } />
          <Clock hours={ this.state.hours } minutes={ this.state.minutes }
          seconds={this.state.seconds} diem={ this.state.diem } />
          <Temp city={ this.state.city } state={ this.state.state } degree={ this.state.degree }
           api={ this.state.weatherApi } hourUpdate={ this.state.hourUpdate } />
          <MLB day={ this.state.day } dayUpdate={ this.state.dayUpdate } />
          <Stock stock={ this.state.stock } hourUpdate={ this.state.hourUpdate } />
        </div>
      </Flickr>
    );
  }
});

module.exports = App;