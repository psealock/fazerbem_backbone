var http = require('http'),
	express = require('express'),
	app = express();

var port = process.env.PORT || 8080;

app.use(express.bodyParser());
app.use(express.methodOverride());
app.configure(function(){
  app.use(express.static(__dirname + '/app'));
});
app.use(app.router);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

//Mongo DB Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://shopping:list2013@ds043457.mongolab.com:43457/shopping');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("yay, I'm connected to my mongo!")

  //access shoppers list.
  var shoppersSchema = mongoose.Schema({
  	name: String,
  	products: [{
  		item: String,
  		aisle: String,
  		incart: Boolean,
  		bought: Boolean
  	}]
  })
  var shoppers = mongoose.model('shoppers', shoppersSchema)



  app.get('/shoppers', function (req, res){
		res.contentType('application/json'); 

		shoppers.find(function (err, input){
			if(err) {console.log(err)};
			res.send(input);
			res.end();
		})
	});

  app.get('/products/:param', function (req, res){
		res.contentType('application/json');

		shoppers.find({name: req.params.param}, function (err, input){
			if (err) {console.log(err)};
		res.send(input[0].products);
		res.end();
		})
	});

	app.post('/newProduct/:param', function (req, res){

		shoppers.update({name: req.params.param}, {$push: {products:{
			item: req.body.item,
			aisle: req.body.aisle,
			incart: req.body.incart,
			bought: req.body.bought
		}}}, function (err, shoppers){
			if(err) {console.log(err)};
		});
		res.end();
	});

	app.post('/toCart/:param', function (req, res){

		shoppers.update({name: req.params.param, "products.item": req.body.item}, {$set:{"products.$.incart": true}}, false, true);

		res.end();
	});


	app.post('/changeToBought/:param', function (req, res){
		shoppers.update(
			{name: req.params.param, "products.item": req.body.item},
			{$set:{"products.$.bought": true}}, false, true);
		res.end();
	});

	app.post('/resetBoughtPlusIncart/:param', function (req, res){

		shoppers.find({name: req.params.param}, function (err, input){
			if (err) {console.log(err)};
			var cartItemLength = input[0].products.length -1;
			for (var i = cartItemLength; i >= 0; i--) {
				shoppers.update(
					{name: req.params.param, "products.bought": true},
					{$set:{"products.$.bought": false}}, false, true
				);
				shoppers.update(
					{name: req.params.param, "products.incart": true},
					{$set:{"products.$.incart": false}}, false, true
				);
			};
		});

		res.end();
	});

});



app.listen(port);

console.log("Listening on port 8080...");






// var shoppersHardCode = [
// 	{"name": "Alyssa",
// 		"products": [
// 			{"item": "Bananas", "aisle": "1", "incart": true, "bought": false},
// 			{"item": "Chicken", "aisle": "3", "incart": true, "bought": false},
// 			{"item": "Chocolate", "aisle": "6", "incart": true, "bought": false},
// 			{"item": "Coconut Milk", "aisle": "4", "incart": true, "bought": false},
// 			{"item": "Collard Greens", "aisle": "1", "incart": true, "bought": false},
// 			{"item": "Papaya", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Tahini", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Parsley", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Sardines", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Cheese", "aisle": "2", "incart": false, "bought": false},
// 			{"item": "Nuts", "aisle": "2", "incart": false, "bought": false}
// 		]
// 	},
// 	{"name": "Caetano",
// 		"products": [
// 			{"item": "Bananas", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Chicken", "aisle": "3", "incart": false, "bought": false},
// 			{"item": "Chocolate", "aisle": "6", "incart": false, "bought": false},
// 			{"item": "Coconut Milk", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Collard Greens", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Papaya", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Tahini", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Parsley", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Sardines", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Cheese", "aisle": "2", "incart": false, "bought": false},
// 			{"item": "Nuts", "aisle": "2", "incart": false, "bought": false}
// 		]
// 	},
// 	{"name": "Thamare",
// 		"products": [
// 			{"item": "Bananas", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Chicken", "aisle": "3", "incart": false, "bought": false},
// 			{"item": "Chocolate", "aisle": "6", "incart": false, "bought": false},
// 			{"item": "Coconut Milk", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Collard Greens", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Papaya", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Tahini", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Parsley", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Sardines", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Cheese", "aisle": "2", "incart": false, "bought": false},
// 			{"item": "Nuts", "aisle": "2", "incart": false, "bought": false}
// 		]
// 	},
// 	{"name": "Paul",
// 		"products": [
// 			{"item": "Bananas", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Chicken", "aisle": "3", "incart": false, "bought": false},
// 			{"item": "Chocolate", "aisle": "6", "incart": false, "bought": false},
// 			{"item": "Coconut Milk", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Collard Greens", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Papaya", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Tahini", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Parsley", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Sardines", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Cheese", "aisle": "2", "incart": false, "bought": false},
// 			{"item": "Nuts", "aisle": "2", "incart": false, "bought": false}
// 		]
// 	},
// 	{"name": "Vanessa",
// 		"products": [
// 			{"item": "Bananas", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Chicken", "aisle": "3", "incart": false, "bought": false},
// 			{"item": "Chocolate", "aisle": "6", "incart": false, "bought": false},
// 			{"item": "Coconut Milk", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Collard Greens", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Papaya", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Tahini", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Parsley", "aisle": "1", "incart": false, "bought": false},
// 			{"item": "Sardines", "aisle": "4", "incart": false, "bought": false},
// 			{"item": "Cheese", "aisle": "2", "incart": false, "bought": false},
// 			{"item": "Nuts", "aisle": "2", "incart": false, "bought": false}
// 		]
// 	}
// ];



