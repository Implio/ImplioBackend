const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();

const User = require('./models/user');
const Procedure = require('./models/procedure');
const Patient = require('./models/patient');

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  User.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['social', 'dob', 'password', 'title', 'firstName', 'lastName']);

  const user = new User(body);

  user.save((err, doc) => {
    if (err) return res.send(err);

    res.send(doc);
  });
});

app.patch('/users/:id', (req, res) => {
  const update = _.pick(req.body, ['social', 'dob', 'password', 'title', 'firstName', 'lastName']);

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
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete('/users/:id', (req, res) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get('/procedures', (req, res) => {
  Procedure.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.post('/procedures', (req, res) => {
  const body = _.pick(req.body, [
    'patientId',
    'procedureName',
    'date',
    'category',
    'doctorId',
    'description',
    'documents',
  ]);

  const procedure = new Procedure(body);

  procedure.save((err, doc) => {
    if (err) return res.send(err);

    res.send(doc);
  });
});

app.patch('/procedures/:id', (req, res) => {
  const update = _.pick(req.body, [
    'patientId',
    'procedureName',
    'date',
    'category',
    'doctorId',
    'description',
    'documents',
  ]);

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
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete('/procedures/:id', (req, res) => {
  Procedure.findOneAndRemove({ _id: req.params.id })
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get('/patients', (req, res) => {
  Patient.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.post('/patients', (req, res) => {
  const body = _.pick(req.body, [
    'firstName',
    'lastName',
    'roomNumber',
    'buildingNumber',
    'address',
    'dob',
    'healthInsurance',
    'phoneNumber',
    'picture',
    'documents',
  ]);

  const patient = new Patient(body);

  patient.save((err, doc) => {
    if (err) return res.send(err);

    res.send(doc);
  });
});

app.patch('/patients/:id', (req, res) => {
  const update = _.pick(req.body, [
    'firstName',
    'lastName',
    'roomNumber',
    'buildingNumber',
    'address',
    'dob',
    'healthInsurance',
    'phoneNumber',
    'picture',
    'documents',
  ]);

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
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete('/patients/:id', (req, res) => {
  Patient.findOneAndRemove({ _id: req.params.id })
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
