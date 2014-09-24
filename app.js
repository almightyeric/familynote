var express = require('express');
var app = express();
var Project = require('./models/fuzzies.js').Fuzzy;
var mongoose = require("mongoose");
var mailer = require('nodemailer');

// connect to mongoDB database on modulus.io
uristring='mongodb://shengwei:Zsw1989723824@novus.modulusmongo.net:27017/zyrY2xan'
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser())
   .use(express.methodOverride())
   .use(app.router)
   .use(express.multipart());
app.use(express.logger("default"));

//controllers
var controller = require('./controllers/controller.js');


app.get("/", controller.home);
app.get("/:person", controller.person);
app.post("/submit", controller.create);

// listen (start app with node app.js)
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});


module.exports = app;