const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get('/users', function(req, res) {
  res.send();
});

app.post('/users', function(req, res) {
  res.send();
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
