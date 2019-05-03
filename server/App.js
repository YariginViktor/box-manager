var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var Schema = mongoose.Schema

var c = mongoose.model('boxes', new Schema({
	title: { type: String }
}))

var app = express()

app.use( bodyParser.json() )

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/boxes', (req, res) => {
  c.find((e, r) =>
  		res.send(r)
  	)
});

app.listen(8090, function () {
	console.log('Example app listening on port 8090!');
	mongoose.connect('mongodb://127.0.0.1:27017/box-manager', {useNewUrlParser: true})
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', console.error.bind(console, 'connection success'));
});