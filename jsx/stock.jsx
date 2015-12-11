import React from 'react';

let update = 0;

const Stock = React.createClass({
  displayName: 'Stock',
  getInitialState() {
    return {};
  },
  componentDidMount() {
    const component = this;
    const request = new XMLHttpRequest();
    request.open('GET', '/stock?s=' + this.props.stock, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        component.setState(data[0]);
      }
    };
    request.send();
  },
  render() {
    const { hourUpdate } = this.props;
    const upDown = this.state.up_down;
    let image = 'img/stock/' + upDown + '.svg';

    // avoid undefined missing image
    if(upDown === undefined) {
      image = '';
    }

    // run update
    if(hourUpdate > update) {
      update = hourUpdate;
      this.componentDidMount();
    }

    return (
      <div className='stock'>
        <span className='symbol'>{ this.state.symbol }</span>
        <span className='price'> ${ this.state.stock_number }</span>
        <img src={ image } />
        <p className='small'>Previous: ${ this.state.previous }</p>
      </div>
    );
  }
});
module.exports = Stock;