var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Custom modules.
var databaseRef = require("./database_ref.js");
var httpReqs = require("./httpreqs.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var database = databaseRef.database;

httpReqs(); // Call function for GET and POST requests.

// Get all documents from CouchDB.
app.get("/pi_couchstarwars", function(req, res) {
    database.allDocs({include_docs: true}).then(function(result) {
        res.jsonp(result.rows.map(function(item) {
            return item.doc; // Respond with and return all documents.
        }));

    }, function(error) {
        res.status(400).send(error); // Respond with error if error.
    });
});

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
