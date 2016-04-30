 // BASE SETUP =================================================================

 // call the packages we need
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');

 // configure app to use bodyParser()
 // this will let us get the data from a POST
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 var port = process.env.PORT || 8080;

 // ROUTES FOR OUR API =========================================================
 var router = express.Router(); //get the instance of the express Router

 // test route to make sure everything is working
 router.get('/', function(req, res) {
   res.json({ message: 'Welcome to the Kitten API!' })
 });

 // ADD MORE ROUTES HERE!

 // REGISTER OUR ROUTES --------------------------------------------------------
 app.use('/api', router);

 // START THE SERVER ===========================================================
 app.listen(port);
 console.log('Magic happens on port: ' + port);
