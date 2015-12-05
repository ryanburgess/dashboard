import React from 'react';
import config from '../config.json';
const teams = config.sports.mlb;

let output = [];
const getGames = () => {
  const d = new Date();
  const m = d.getMonth() + 1;
  const dd = d.getDate();
  const y = d.getFullYear();

  if(m <= 9) {
    m = '0' + m;
  }
  if(dd <= 9) {
    dd = '0' + dd;
  }

  const request = new XMLHttpRequest();
  request.open('GET', 'http://gd2.mlb.com/components/game/mlb/year_' + y + '/month_'
    + m + '/day_' + dd + '/master_scoreboard.json', true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      const games = data.data.games.game;
      output = [];
      if(games !== undefined) {
        if(games.length !== undefined) {
          games.map(function(game) {
            const time = game.time;
            const timeZone = game.time_zone;
            const awayTeam = game.away_team_name;
            const homeTeam = game.home_team_name;

            // only output teams in the config file
            if(teams.indexOf(homeTeam) > -1 || teams.indexOf(awayTeam) > -1) {
              output.push(homeTeam + ' vs. ' + awayTeam + ' ' + time + ' ' + timeZone);
            }
          });
        } else {
          const time = games.time;
          const timeZone = games.time_zone;
          const awayTeam = games.away_team_name;
          const homeTeam = games.home_team_name;

          // only output teams in the config file
          if(teams.indexOf(homeTeam) > -1 || teams.indexOf(awayTeam) > -1) {
            output.push(homeTeam + ' vs. ' + awayTeam + ' ' + time + ' ' + timeZone);
          }
        }
      }
    }
  };
  request.send();
};

const MLB = React.createClass({
  displayName: 'MLB',
  getInitialState() {
    getGames();
    return { games: output };
  },
  render() {
    return (
      <ul className='mlb'>
        {output.map(function(item, i) {
          return <li key={i}>{ item }</li>;
        })}
      </ul>
    );
  }
});

module.exports = MLB;