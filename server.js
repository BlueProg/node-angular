
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');  // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var router = express.Router();

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var todos = [];

router.use(function(req, res, next) {
	console.log('start log');
 	console.log(req.method, req.url);
 	console.log('end log');
	next();
})

router.route('/api/todos')
	.get(function(req, res) {
		res.json(todos);
	})
	.post(function(req, res) {
		console.log(req.body.text);
		todos.push({
			'text' : req.body.text,
			'done' : false,
			'id' : Math.random(10000)
		})
		res.json(todos);
	})


router.delete('/api/todos/:id', function(req, res) {
	res.json(todos);
})

router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

app.use('/', router);

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
