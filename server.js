require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const MongoClient = require("mongodb").MongoClient;
var db;
var dbURL = process.env.DB_URL;

MongoClient.connect(
  dbURL,
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("cycling-quotes-db");
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  }
);

app.get("/", (req, res) => {
  db.collection("quotes")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { quotes: result });
    });
});

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err, result) => {
    if (err) return console.log(err);
    res.redirect("/");
  });
});

app.use(bodyParser.json());
app.put("/quotes", (req, res) => {
  db.collection("quotes").findOneAndUpdate(
    { name: "Lance" },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});
