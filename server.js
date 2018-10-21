var express = require("express");

var app = express();
var PORT = 3000;

var middleware = {
  requireAuthentication: function(req, res, next) {
    console.log("private route hit!");
    next();
  },
  logger: function(req, res, next) {
    console.log(
      "Request: " +
        new Date().toString() +
        " " +
        req.method +
        " " +
        req.originalUrl
    );
    next();
  }
};

//git commiting
app.use(middleware.logger);
app.use(middleware.requireAuthentication);

//root url

// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });

app.get("/about", middleware.requireAuthentication, function(req, res) {
  res.send("About page");
});

// app.get("/public/index.html", function(req, res) {
//   res.send("About page");
// });
//Exposes the directory so people can access the html in the directory
app.use(express.static(__dirname + "/public"));

//Gets current directory
// console.log(__dirname);

//list the port you want to use
app.listen(PORT, function() {
  console.log("Express Server Started on port " + PORT + "!");
});
