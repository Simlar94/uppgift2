var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var databaseRef = require("./database_ref.js");
var httpReqs = require("./httpreqs.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'views')));

var database = databaseRef.database;

httpReqs();

// Add document to CouchDB.
app.post("/pi_couchstarwars", function(req, res){
    database.post(req.body).then(function(result){
        res.send(console.log("POST request received."));
        res.end();
    }, function(error){
        res.status(400).send(error);
    });
}); 

app.listen(3000);
console.log("Server is running on port 3000");