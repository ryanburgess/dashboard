import React from 'react';

const Tasks = React.createClass({
  displayName: 'Tasks',
  render() {
    let daily = [''];
    const today = this.props.day;

    if(this.props.daily !== undefined) {
      daily = this.props.daily;
    }

    return (
      <ul className='tasks'>
          {daily.map(function(item, i) {
            if(item.day === today || item.day === 'All') {
              const image = 'img/tasks/' + item.img;
              return <li key={i}>{item.task} <img src={image} /></li>;
            }
          })}
      </ul>
    );
  }
});

module.exports = Tasks;