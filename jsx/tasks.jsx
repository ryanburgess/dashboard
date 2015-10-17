const React = require('react');
const daily = require('../daily.json');

const Tasks = React.createClass({
  render() {
    let today = this.props.day;
    return (
      <ul className='tasks'>
        {daily.map(function(item, i){
          if(item.day === today || item.day === 'All'){
            let image = 'public/img/tasks/' + item.img;
            return <li key={i}>{item.task} <img src={image} /></li>;
          }
        })}
      </ul>
    );
  }
});

module.exports = Tasks;