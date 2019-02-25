const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;

// all CRUD handlers are below

// app.listen(3000, function() {
//   console.log("listening on 3000");
// });

// mongoDB connection
var db;
// var dbURL =
//   "mongodb://bikeFAN:<duraACE>@hello-node-shard-00-00-mdbhs.mongodb.net:27017,hello-node-shard-00-01-mdbhs.mongodb.net:27017,hello-node-shard-00-02-mdbhs.mongodb.net:27017/test?ssl=true&replicaSet=hello-node-shard-0&authSource=admin&retryWrites=true";

MongoClient.connect(
  "mongodb://bikeFAN:duraACE@hello-node-shard-00-00-mdbhs.mongodb.net:27017,hello-node-shard-00-01-mdbhs.mongodb.net:27017,hello-node-shard-00-02-mdbhs.mongodb.net:27017/test?ssl=true&replicaSet=hello-node-shard-0&authSource=admin&retryWrites=true",
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("cycling-quotes-db");
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  }
);

// app.get("/", function(req, res) {
//   res.send("Hello World");
// });
app.get("/", (req, res) => {
  // res.send("Hello World");
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  console.log(req.body);

  db.collection("quotes").save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log("saved to database");
    res.redirect("/");
  });
});

////

// app.post('/quotes', (req, res) => {
//   db.collection('quotes').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })
