import React from 'react';

const Stock = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    let component = this;
    let request = new XMLHttpRequest();
    request.open('GET', 'http://stockz-api.herokuapp.com/api/?s='+ this.props.stock, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        component.setState(data[0]);
      }
    };
    request.send();
  },
  render: function(){
    let image = 'public/img/stock/' + this.state.up_down + '.svg';
    return(
      <div className='stock'>
        <span className='symbol'>{this.state.symbol}</span>
        <span className='price'> ${this.state.stock_number}</span>
        <img src={image} />
        <p className='small'>Previous: ${this.state.previous}</p>
      </div>
    )
  }
});
module.exports = Stock;