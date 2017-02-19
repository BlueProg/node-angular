
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var router = express.Router();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


var todos = [];

router.use(function(req, res, next) {
 	console.log(req.method, req.url);
	next();
})

router.route('/api/todos')
	.get(function(req, res) {
		res.json(todos);
	})
	.post(function(req, res) {
		todos.push({
			'text' : req.body.text,
			'done' : false,
			'id' : Math.floor(Math.random(10000) * 100)
		})
		res.json(todos);
	})

router.route('/api/todos/:id')
	.delete(function(req, res) {
		for (var i = todos.length - 1; i >= 0; i--) {
			if (todos[i].id == req.params.id) {
				if (i == 0)
					todos.splice(i, 1);	
				else
					todos.splice(i, i);
			}
		}
		res.json(todos);
	})

router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

app.use('/', router);

app.listen(8080);
console.log("App listening on port 8080");
