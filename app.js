const express = require("express");
const mongoose = require("./db/mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

const User = require("./models/user");

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  User.find({}, (err, docs)=>{
    res.send(docs);
  });
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['password', 'title', 'firstName', 'lastName']);

  const user = new User(body);

  user.save((err, doc) => {
    if(err)
      return res.send(err);

    res.send(doc);
  });
});

app.patch('/users/:id', (req, res)=>{
  const update = _.pick(req.body, ['password', 'title', 'firstName', 'lastName']);

  User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: update,
    },
    {
      new: true,
    }
  )
  .then((doc) => {
    res.send(doc);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.delete('/users/:id', (req, res)=>{
  User.findOneAndRemove({_id: req.params.id})
  .then((doc)=>{
    res.send(doc);
  })
  .catch((err)=>{
    res.send(err);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
