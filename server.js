 // BASE SETUP =================================================================

 // call the packages we need
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');

 // connect db
 mongoose.connect('mongodb://localhost/db_testing');

 var Kitten = require('./app/models/kitten');

 // configure app to use bodyParser()
 // this will let us get the data from a POST
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 var port = process.env.PORT || 8080;



 // ROUTES FOR OUR API =========================================================
 var router = express.Router(); //get the instance of the express Router


 // middleware to use for all requests
 router.use(function(req, res, next) {
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

 // on routes that end in /kittens -----------------------------------------------
 router.route('/kittens')
  // create a new kitten - accessed at POST http://localhost:8080/api/kittens
  .post(function(req, res) {
    // create a new instance of the Kitten model
    var kitten = new Kitten();

    // set the new kitten's name from the request body
    kitten.name = req.body.name;
    // save the new instance of Kitten and check for any errors
    kitten.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: "A new kitten has been born!" });
    })
  })
      // get all teh kittens - accessed at GET http://localhost:8080/api/bears
  .get(function(req, res) {
    Kitten.find(function(err, kittens) {
      if (err)
        res.send(err);

      res.json(kittens);
    });
  });

  // routes that end in /kittens/:kitten_id
  router.route('/kittens/:kitten_id')

    // get the unique instance of the kitten with the id passed
    .get(function(req, res) {
      Kitten.findById(req.params.kitten_id, function(err, kitten) {
        if (err)
          res.send(err);
        // if the request is success return the kitten back as JSON
        res.json(kitten);
      })
    })
    // take the unique instance of the kitten and update it
    .put(function(req, res) {
      Kitten.findById(req.params.kitten_id, function(err, kitten) {
        if (err)
          res.send(err);
        //change the name of the kitten based on what is passed in the body
        kitten.name = req.body.name;

        kitten.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Kitten was updated! '});
        });
      })
    })

    // delete the unique instance of the kitten - access at DELETE http://localhost:8080/api/kittens/:kitten_id
    .delete(function(req, res) {
      Kitten.remove({
        _id: req.params.kitten_id

      }, function(err, kitten){
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
    });

 // REGISTER OUR ROUTES --------------------------------------------------------
 app.use('/api', router);

 // START THE SERVER ===========================================================
 app.listen(port);
 console.log('Magic happens on port: ' + port);
