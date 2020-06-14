let db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
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
  }
