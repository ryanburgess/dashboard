import React from 'react';

const Stock = React.createClass({
  render() {
    let stock = this.props.stock;
    let symbol = this.props.stock_symbol;
    return (
      <p className='stock'>
        <span className='symbol'>{symbol}</span>
        <span className='price'> ${stock}</span>
      </p>
    );
  }
});

module.exports = Stock;