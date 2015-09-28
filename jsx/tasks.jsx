var React = require('react');
var daily = require('../daily.json');

var getDay = () => {
  let d = new Date();
  let weekday = new Array(7);
  weekday[0]=  'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  let day = weekday[d.getDay()];

  return day;
}
var today = getDay();

var Tasks = React.createClass({
  render() {
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