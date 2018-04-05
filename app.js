const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();

const { authenticate, admin } = require('./middleware/authenticate');
const cors = require('./middleware/cors');

const User = require('./models/user');
const Procedure = require('./models/procedure');
const Patient = require('./models/patient');

app.use(bodyParser.json());
app.use(cors);

app.post('/login', (req, res) => {
  const body = _.pick(req.body, ['social', 'password']);

  User.findBySocial(body.social, body.password, (err, doc) => {
    if (err) return res.status(401).send(err);

    const token = doc.generateAuthToken();

    res.send({ token });
  });
});

app.get('/users', authenticate, (req, res) => {
  User.find({}, (err, docs) => {
    res.send(docs);
  });
});

//TODO ADD ADMIN PERMISSION
app.post('/users', (req, res) => {
  const body = _.pick(req.body, [
    'social',
    'dob',
    'password',
    'title',
    'firstName',
    'lastName',
  ]);

  const user = new User(body);

  user.save((err, doc) => {
    if (err) return res.send(err);

    res.send(doc);
  });
});

app.patch('/users/:id', authenticate, (req, res) => {
  const update = _.pick(req.body, [
    'social',
    'dob',
    'password',
    'title',
    'firstName',
    'lastName',
  ]);

  User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: update,
    },
    {
      new: true,
    },
  )
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete('/users/:id', admin, (req, res) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get('/procedures', authenticate, (req, res) => {
  Procedure.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.post('/procedures', authenticate, (req, res) => {
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

app.patch('/procedures/:id', authenticate, (req, res) => {
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
    },
  )
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete('/procedures/:id', admin, (req, res) => {
  Procedure.findOneAndRemove({ _id: req.params.id })
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get('/patients', authenticate, (req, res) => {
  Patient.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.post('/patients', authenticate, (req, res) => {
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

app.patch('/patients/:id', authenticate, (req, res) => {
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
    },
  )
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete('/patients/:id', admin, (req, res) => {
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
