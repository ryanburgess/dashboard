# Dashboard
Dashboard to display time, weather, stock, clock, date, to do tasks, flickr photos.

[DEMO](http://ryanburgess.github.io/dashboard/)

Created with React and Express.

![Screenshot of dashboard](https://raw.github.com/ryanburgess/dashboard/master/screenshot.jpg)

#Setup
* Run `npm install`
* Create `config.json` from `config_example.json` and replace the placeholder items. Get a [Flickr API Key](https://www.flickr.com/services/api/misc.api_keys.html) and a [Wunder Ground API](http://api.wunderground.com/)
* Run `gulp scripts compress`
* Open `npm start`.
* Load `http://localhost:3000` in the browser.

#TODO
* Pull in TV schedule API
* Use user location (maybe)
* Add more sports and options to follow teams
* Add world clock option
* Create better config (alignment, color, updates, array of stocks, show/not show components, arrangement)
* Pull in birthdays
* Word of the day
* Pull in Trello
* Pull in Google Calendar
* Black background option
* Multiple stocks at one time
