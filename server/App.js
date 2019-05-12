var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var Schema = mongoose.Schema

var Order = mongoose.model('orders', new Schema({
	title: { type: String },
	user: { type: String },
	boxes: { type: Array },
	phone: { type: String },
	date: { type: Date },
	created: { type: Date }
}))

var Box = mongoose.model('boxes', new Schema({
	title: { type: String },
	ico: { type: String },
	descr: { type: String },
	price: { type: String }
}))

var app = express()

app.use( bodyParser.json() )

// ORDERS
app.get('/', function (req, res) {
  res.send('Wellcome to Box-manager!');
});

app.get('/orders', (req, res) => {
  Order.find((e, r) =>
  		res.send(r)
  	)
});

app.get('/orders/find', (req, res) => {
	Order.find({_id: req.query.id}).then(data => res.send(data))
});

app.put('/orders/save', (req, res) => {
	Order.findOneAndUpdate({_id: req.body.id}, req.body).then(data => res.send(data))
});

app.post('/orders', (req, res) => {
	const order = new Order(req.body)
	order.save().then(data => res.send(data))
});

app.delete('/orders/_id', (req, res) => {
	Order.deleteOne({_id: req.query.id}).then(data => res.send(data))
});

// BOXES

app.get('/boxes', (req, res) => {
  Box.find((e, r) =>
  		res.send(r)
  	)
});

app.get('/boxes/find', (req, res) => {
	Box.find({_id: req.query.id}).then(data => res.send(data))
});

app.put('/boxes/save', (req, res) => {
	Box.findOneAndUpdate({_id: req.body.id}, req.body).then(data => res.send(data))
});

app.post('/boxes', (req, res) => {
	const box = new Box(req.body)
	box.save().then(data => res.send(data))
});

app.delete('/boxes/_id', (req, res) => {
	Box.deleteOne({_id: req.query.id}).then(data => res.send(data))
});



app.listen(8090, function () {
	console.log('Example app listening on port 8090!');
	mongoose.connect('mongodb://127.0.0.1:27017/box-manager', {useNewUrlParser: true})
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', console.error.bind(console, 'connection success'));
});