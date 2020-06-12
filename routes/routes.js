const db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("./scrape", function(req, res){
        let found;
        let titleArr = [];
          db.Article.find({}).then(function(dbArticle) {
              for (let i=0; i<dbArticle.length; i++) {
                  titleArr.push(dbArticle[i].title)
              } console.log(titleArr);
            request("https://www.npr.org/", function(error, response, html) {
            if (!error && response.statusCode == 200) {

            }
            });
            let $ = cheerio.load(html, {

            })

          })

    
    });

};


    //   request("https://universe.byu.edu/", function(error, response, html) {
    //   if (!error && response.statusCode == 200) {
    //       // console.log(html);
    //     }
    //   // Then, we load that into cheerio and save it to $ for a shorthand selector
    //   var $ = cheerio.load(html, {
    //     xml: {
    //       normalizeWhitespace: true,
    //     }
    //   });