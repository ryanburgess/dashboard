var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.render('./index.ejs', {});
})

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port ' + port);
});
