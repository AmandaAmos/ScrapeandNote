//setting the stage
let express = require("express");
let bodyParser = require("body-parser");
let exphbs = require("express-handlebars");
let mongoose = require("mongoose");
let logger = require("morgan");

//Scraping Tools
//const request = require("request");
//const cheerio = require("cheerio");

//Models
let db = require("./models/");

//set PORT
let PORT = process.env.PORT || 3000;

//initialize Express
let app = express();

//Morgan logger for logging requests
app.use(logger("dev"));

//Body-parser for form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//public folder as a static directory
app.use(express.static("public"));

//default template route
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");



//mongo and mongoose 
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect to Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
let results = [];

//Routes
app.get("/", function (req, res) {
    res.render("index");
});

var axios = require("axios");
var cheerio = require("cheerio");

app.get("./scrape", function (req, res) {
    let found;
    let titleArr = [];
    db.Article.find({}).then(function (dbArticle) {
        for (let i = 0; i < dbArticle.length; i++) {
            titleArr.push(dbArticle[i].title)
        }
        console.log(titleArr);
        request("https://www.npr.org/", function (error, response, html) {
            if (!error && response.statusCode == 200) {

            }
        });
        let $ = cheerio.load(html, {

        });

    });
    $("main h3").each(function (i, element) {
        //empty result object
        const result = {};

        result.title = $(element).children("a").text();
        found = titleArr.includes(result.title);
        result.link = $(element).children("a").attr("href");
        result.image = $(element).children("storytext").attr("img");
        if (!found && result.title && result.link) {
            results.push(result);
        }

    });
    res.render("scrape", {
        articles: results
    });
});

//route for retrieving all articles from the database
app.get("/saved", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        console.log(dbArticle);
        res.render("saved", {
            saved: dbArticle
        });
    }).catch(function (err) {
        //if there's an error, send to the client
        res.json(err);
    });
});

//route creating an Article in the database
app.post("/api/saved", function (req, res) {
    db.Article.create(req.body).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        //if there's an error send this to client
        res.json(err);
    });
});

//route for retrieving a specific Article by Id, populate it with it's note
app.get("/articles/:id", function (req, res) {
    console.log(req.params.id);

    db.Article.findOne({
        _id: req.params.id
    }).populate("note").then(function (dbArticle) {
        console.log(dbArticle);
        if (dbArticle) {
            res.render("articles", {
                data: dbArticle
            });
        }
    }).catch(function (err) {
        res.json(err);
    });
});

//route for deleting an article from the db
app.delete("/saved/:id", function (req, res) {
    db.Article.deleteOne({
        _id: req.params.id
    }).then(function (removed) {
        res.json(removed);
    }).catch(function (err, removed) {
        res.json(err);
    });
});

//route for saving/updating an Article's Note
app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body).then(function (dbNote) {
        db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    note: dbNote._id
                }
            }, {
                new: true
            })
            .then(function (dbArticle) {
                console.log(dbArticle);
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    }).catch(function (err) {
        res.json(err);
    })
});




// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "." + "...Clink of link" + "http:localhost3000");
});