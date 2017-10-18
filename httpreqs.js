var request = require("request");

var data = "";
var bool = false;

module.exports = function() {
    // GET request to external API.
    var headers = {
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
    }

    var options = {  
        url: "https://swapi.co/api/people/",
        method: "GET",
        headers: headers
    };

    request(options, function(err, res, body) {  
        data = JSON.parse(body);

        bool = true;

        if (bool == true) {
            post();
        }

    }).on("error", function(err){
        console.log(err);
    });

    // POST request to CouchDB.
    var post = function() {
        var objectLength = data.results.length;
        var randomNumb = Math.floor(Math.random() * objectLength) + 1;
        
        var headers = {
            "User-Agent": "Super Agent/0.0.1",
            "Content-Type": "application/json"
        }

        var options = {
            url: "http://localhost:3000/pi_couchstarwars",
            method: "POST",
            headers: headers,
            form: data.results[randomNumb]
        }

        request(options, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                console.log("POST request successful."); 
            }
        }).on("error", function(err){
            console.log(err);
        });
    };
};