const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const users = [
  {
    "name": "Jose",
    "gender": "Male",
    "phone": "3333333333"
  },
  {
    "name": "Bruno",
    "gender": "Female",
    "phone": "1111111111"
  }
];

app.get('/users', function(req, res) {
  res.send(users);
});

app.post('/users', function(req, res) {
  users.push(req.body);

  req.body.id = 2;

  res.send(req.body);
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
