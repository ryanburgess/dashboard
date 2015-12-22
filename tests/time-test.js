

var test = require('tape');
var time = require('../jsx/time');
 
test('Test time function', function (t) {
  t.equal(time(), undefined, '');
  t.end();
});

// var test = require('tape');

// test('timing test', function (t) {
//     t.plan(2);

//     t.equal(typeof Date.now, 'function');
//     var start = Date.now();

//     setTimeout(function () {
//         t.equal(Date.now() - start, 100);
//     }, 100);
// });