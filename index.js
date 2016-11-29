// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 6060; 	// set the port
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

global.moment = require('moment');

// configuration ===============================================================
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    next();
});

// routes ======================================================================
app.all('/api/*', function( request, response, next ) {
  next(); 
});
require('./server/routes/isodate.route.js')(app);

// listen (start app with node index.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
