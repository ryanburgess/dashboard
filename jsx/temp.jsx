var React = require('react');

var Temp = React.createClass({
  render() {
    return (
      <p className='temp'>
        {this.props.temp}{this.props.degree} {this.props.weather} <img src={this.props.icon} />

        <span className='small'>{this.props.feels}{this.props.degree}</span>
      </p>
    );
  }
});

module.exports = Temp;