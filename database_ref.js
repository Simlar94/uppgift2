var PouchDB = require("pouchdb");

var database = new PouchDB ("http://localhost:5984/pi_couchstarwars");
exports.database = database;