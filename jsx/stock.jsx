import React from 'react';

const Stock = React.createClass({
  render() {
    let stock = this.props.stock;
    let symbol = this.props.stock_symbol;
    let previous = this.props.stock_previous;
    let image = '/public/img/stock/' + this.props.up_down + '.svg';
    return (
      <div className='stock'>
        <span className='symbol'>{symbol}</span>
        <span className='price'> ${stock}</span>
        <img src={image} />
        <p className='small'>Previous: ${previous}</p>
      </div>
    );
  }
});

module.exports = Stock;