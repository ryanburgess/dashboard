import React from 'react';

let update = 0;

const Stock = React.createClass({
  getInitialState() {
    return {};
  },
  componentDidMount() {
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
  render(){
    const {hourUpdate, up_down} = this.props;
    let image = 'public/img/stock/' + up_down + '.svg';

    // avoid undefined missing image
    if(up_down === undefined){
      image = '';
    }

    // run update
    if(hourUpdate > update){
      update = hourUpdate;
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