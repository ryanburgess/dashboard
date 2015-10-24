import React from 'react';
import config from '../config.json';
const teams = config.sports.mlb;

var output = [];
Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}
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
      
      if(games !== undefined){
        if(games.length !== undefined){
          games.map(function(game, i){
            let away = game.away_team_city;
            let home = game.home_team_city;
            let time = game.time;
            let timeZone = game.time_zone;
            let venue = game.venue;
            let awayTeam = game.away_team_name;
            let homeTeam = game.home_team_name;

            // only output teams in the config file
            if(teams.contains(homeTeam) || teams.contains(awayTeam)){
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

          // only output teams in the config file
          if(teams.contains(homeTeam) || teams.contains(awayTeam)){
            output.push(homeTeam + ' vs. '  + awayTeam + ' ' + time + ' ' + timeZone);
          }
        }
      }
    }
  };
  request.send();
}

var MLB = React.createClass({
  getInitialState() {
    getGames();
    return {games: output};
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