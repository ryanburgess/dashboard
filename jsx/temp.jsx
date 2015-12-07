import React from 'react';
let update = 0;
const Temp = React.createClass({
  displayName: 'Temp',
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const component = this;
    const degree = this.props.degree;
    const request = new XMLHttpRequest();
    request.open('GET', 'http://api.wunderground.com/api/' + this.props.api + '/conditions/q/' + this.props.state + '/'
      + this.props.city + '.json', true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);

        // get the tempurature
        let temp;
        let feels;
        if(degree === 'C') {
          temp = data.current_observation.temp_c;
          feels = data.current_observation.feelslike_c;
        }else {
          temp = data.current_observation.temp_f;
          feels = data.current_observation.feelslike_f;
        }

        const weather = data.current_observation.weather;
        let icon = data.current_observation.icon_url;
        icon = icon.replace('http://icons.wxug.com/i/c/k/', 'img/weather/').replace('.gif', '.svg').replace('_', '-');
        temp = Number(temp).toFixed(0);
        feels = Number(feels).toFixed(0);

        // create tempurate object
        const tempurature = {
          temp,
          weather,
          feels: 'Feels like ' + feels,
          icon,
          degree
        };
        component.setState(tempurature);
      }
    };
    request.send();
  },
  render() {
    const { hourUpdate } = this.props;
    // run update
    if (hourUpdate > update) {
      update = hourUpdate;
      this.componentDidMount();
    }

    return (
      <p className='temp'>
        {this.state.temp}°{this.state.degree} {this.state.weather} <img src={this.state.icon} />

        <span className='small'>{this.state.feels}°{this.state.degree}</span>
      </p>
    );
  }
});

module.exports = Temp;