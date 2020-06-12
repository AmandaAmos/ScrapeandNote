//setting the stage
let express = require("express");
let bodyParser = require("body-parser");
let exphbs = require("express-handlebars");
let mongoose = require("mongoose");
let logger = require("morgan");

//Scraping Tools
// let request = require("request");
// let cheerio = require("cheerio");

//Models
let db = require("./models");

//set PORT
let PORT = process.env.PORT || 8080;

//initialize Express
let app = express();

//Morgan logger for logging requests
app.use(logger("dev"));

//Body-parser for form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//public folder as a static directory
app.use(express.static("public"));

//default template route
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



//mongo and mongoose 
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect to Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
let results = [];

//Routes
app.get("/", function(req, res) {
    res.render("index");
});
require("./routes")(app);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "." + "...Clink of link" + "http:localhost8080");
  });






























  