import React from 'react';

var output = [];
var SetIntervalMixin = {
  componentWillMount() {
    this.intervals = [];
  },

  componentWillUnmount() {
    this.intervals.map(clearInterval);
  },

  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  }
};
var getGames = () => {
  let d = new Date();
  let m = d.getMonth() + 1;
  let dd = d.getDate();
  let y = d.getFullYear();

  if(m <= 9){
    m = '0' + m;
  }
  if(dd <= 9){
    dd = '0' + dd;
  }

  let request = new XMLHttpRequest();
  request.open('GET', 'http://gd2.mlb.com/components/game/mlb/year_'+ y +'/month_'+ m +'/day_'+ dd +'/master_scoreboard.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      let games = data.data.games.game;

      output = [];
      
      if(games.length !== undefined){
        games.map(function(game, i){
          let away = game.away_team_city;
          let home = game.home_team_city;
          let time = game.time;
          let timeZone = game.time_zone;
          let venue = game.venue;
          let awayTeam = game.away_team_name;
          let homeTeam = game.home_team_name;
          if(home === 'Toronto' || away === 'Toronto'){
            output.push(homeTeam + ' vs. '  + awayTeam + ' ' + time + ' ' + timeZone);
          }

          if(home === 'San Francisco'){
            output.push(homeTeam + ' vs. '  + awayTeam + ' ' + time + ' ' + timeZone);
          }
        });
      }else{
        let away = games.away_team_city;
        let home = games.home_team_city;
        let time = games.time;
        let timeZone = games.time_zone;
        let venue = games.venue;
        let awayTeam = games.away_team_name;
        let homeTeam = games.home_team_name;
        if(home === 'Toronto' || away === 'Toronto'){
          output.push(homeTeam + ' vs. '  + awayTeam + ' ' + time + ' ' + timeZone);
        }

        if(home === 'San Francisco'){
          output.push(homeTeam + ' vs. '  + awayTeam + ' ' + time + ' ' + timeZone);
        }
      }
    }
  };
  request.send();
}

var MLB = React.createClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState() {
    getGames();
    return {games: output};
  },
  componentDidMount() {
    this.setInterval(this.tick, 450000);
  },
  tick() {
    getGames();
    this.setState({games: output});
  },
  render() {
    return (
      <ul className='mlb'>
        {output.map(function(item, i){
          return <li key={i}>{item}</li>;
        })}
      </ul>
    );
  }
});

module.exports = MLB;