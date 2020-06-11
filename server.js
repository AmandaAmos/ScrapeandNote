var express = require("express");
var exphbs = require("express-handlebars");

//set PORT
var PORT = process.env.PORT || 3030;

//default template route
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


































app.listen(PORT, function() 
    console.log("Server listening on: http://localhost:" + PORT);
  });
  