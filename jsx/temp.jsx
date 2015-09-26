var React = require('react');
var output;
var SetIntervalMixin = {
  componentWillMount() {
    this.intervals = [];
  },

  componentWillUnmount() {
    this.intervals.map(clearInterval);
  },

  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  }
};
const getTemp = () => {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://api.wunderground.com/api/837fa9da3834f77b/conditions/q/CA/San_Francisco.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      let temp = data.current_observation.temp_f;
      let weather = data.current_observation.weather;
      let feels = data.current_observation.feelslike_f;
      let icon = data.current_observation.icon_url;
      icon = icon.replace('http://icons.wxug.com/i/c/k/', 'public/img/').replace('.gif', '.svg').replace('_', '-');
      temp = temp.toFixed(0);

      output = {
        temp: temp,
        weather: weather,
        feels: 'Feels like ' + feels,
        icon: icon
      }
      
    }
  };
  request.send();

  return output;
}

var Temp = React.createClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState() {
    return {temp: getTemp()};
  },
  componentDidMount() {
    //this.setInterval(this.tick, 450000);
    this.setInterval(this.tick, 450000);
  },
  tick() {
    getTemp();
    this.setState({temp: output.temp, weather: output.weather, degree: '°F', feels: output.feels, icon: output.icon});
  },
  render() {
    return (
      <p className='temp'>
        {this.state.temp}{this.state.degree} {this.state.weather} <img src={this.state.icon} />

        <span className='small'>{this.state.feels}{this.state.degree}</span>
      </p>
    );
  }
});

module.exports = Temp;