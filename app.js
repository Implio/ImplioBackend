const express = require("express");
const mongoose = require("./db/mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

const User = require("./models/user");
const Procedure = require("./models/procedure");
const Patient = require("./models/patient");

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  User.find({}, (err, docs)=>{
    res.send(docs);
  });
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['social', 'password', 'title', 'firstName', 'lastName']);

  const user = new User(body);

  user.save((err, doc) => {
    if(err)
      return res.send(err);

    res.send(doc);
  });
});

app.patch('/users/:id', (req, res)=>{
  const update = _.pick(req.body, ['social', 'password', 'title', 'firstName', 'lastName']);

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

app.get('/procedure', (req, res) => {
  Procedure.find({}, (err, docs)=>{
    res.send(docs);
  });
});

app.post('/procedure', (req, res) => {
  const body = _.pick(req.body, ['procedureName', 'date', 'category', 'doctorName', 'description', 'Documents']);

  const procedure = new Procedure(body);

  procedure.save((err, doc) => {
    if(err)
      return res.send(err);

    res.send(doc);
  });
});

app.patch('/procedure/:id', (req, res)=>{
  const update = _.pick(req.body, ['procedureName', 'date', 'category', 'doctorName', 'description', 'Documents']);

  Procedure.findOneAndUpdate(
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

app.delete('/procedure/:id', (req, res)=>{
  Procedure.findOneAndRemove({_id: req.params.id})
  .then((doc)=>{
    res.send(doc);
  })
  .catch((err)=>{
    res.send(err);
  });
});

app.get('/patient', (req, res) => {
  Patient.find({}, (err, docs)=>{
    res.send(docs);
  });
});

app.post('/patient', (req, res) => {
  const body = _.pick(req.body, ['name', 'roomNumber', 'address', 'dateOfBirth', 'healthInsurance', 'phoneNumber', 'picture', 'procedures', 'Documents']);

  const patient = new Patient(body);

  patient.save((err, doc) => {
    if(err)
      return res.send(err);

    res.send(doc);
  });
});

app.patch('/patient/:id', (req, res)=>{
  const update = _.pick(req.body, ['name', 'roomNumber', 'address', 'dateOfBirth', 'healthInsurance', 'phoneNumber', 'picture', 'procedures', 'Documents']);

  Patient.findOneAndUpdate(
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

app.delete('/patient/:id', (req, res)=>{
  Patient.findOneAndRemove({_id: req.params.id})
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
