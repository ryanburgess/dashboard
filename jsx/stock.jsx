import React from 'react';

let update = 0;

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
    let asset = this.state.up_down;
    let image = 'public/img/stock/' + asset + '.svg';

    // avoid undefined missing image
    if(asset === undefined){
      image = '';
    }

    // run update
    if(this.props.hourUpdate > update){
      update = this.props.hourUpdate;
      this.componentDidMount();
    }

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