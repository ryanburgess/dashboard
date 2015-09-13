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
function getTemp(){
  var request = new XMLHttpRequest();
  request.open('GET', 'http://api.wunderground.com/api/837fa9da3834f77b/conditions/q/CA/San_Francisco.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      var temp = data.current_observation.temp_f;
      var weather = data.current_observation.weather;
      var feels = data.current_observation.feelslike_f;
      var icon = data.current_observation.icon_url;
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
  getInitialState: function() {
    return {temp: getTemp()};
  },
  componentDidMount: function() {
    //this.setInterval(this.tick, 450000);
    this.setInterval(this.tick, 450000);
  },
  tick: function() {
    getTemp();
    this.setState({temp: output.temp, weather: output.weather, degree: '°F', feels: output.feels, icon: output.icon});
  },
  render: function() {
    return (
      <p className='temp'>
        {this.state.temp}{this.state.degree} {this.state.weather} <img src={this.state.icon} />

        <span className='small'>{this.state.feels}{this.state.degree}</span>
      </p>
    );
  }
});

module.exports = Temp;