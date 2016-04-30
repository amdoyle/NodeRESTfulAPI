 // BASE SETUP =================================================================

 // call the packages we need
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');

 // connect db
 mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

 var Kitten = require('./app/models/kitten');

 // configure app to use bodyParser()
 // this will let us get the data from a POST
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 var port = process.env.PORT || 8080;



 // ROUTES FOR OUR API =========================================================
 var router = express.Router(); //get the instance of the express Router


 // middleware to use for all requests
 router.user(function(req, res, next) {
    // log that something is happening
    console.log("Stuff is happening....");
    //make sure we go to the next route an don't stop there!
    next();
 });

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
