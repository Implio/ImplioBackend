const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const app = express();

const { authenticate, admin } = require('./middleware/authenticate');
const cors = require('./middleware/cors');

const User = require('./models/user');
const Procedure = require('./models/procedure');
const Patient = require('./models/patient');
const Message = require('./models/message');

const FILES_DIR = path.join(__dirname, './files');

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors);
app.use('/files', express.static(FILES_DIR));

app.post('/login', (req, res) => {
  const body = _.pick(req.body, ['social', 'password']);

  User.findBySocial(body.social, body.password, (err, doc) => {
    if (err) return res.send(err);

    const token = doc.generateAuthToken();

    res.send({ token });
  });
});

app.delete('/logout', authenticate, (req, res) => {
  req.user
    .removeToken(req.token)
    .then(() => {
      res.status(200).send('Successfully logged out');
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post('/files', (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  const file = req.files.file;
  file.mv(path.join(FILES_DIR, file.name), err => {
    if (err) return res.send({ err });

    res.send({
      message: 'File uploaded successfully',
      filename: file.name
    });
  });
});

app.get('/me', authenticate, (req, res) => {
  res.send(req.user);
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
    'picture',
    'title',
    'firstName',
    'lastName',
    'isAdmin',
    'type',
    'roomNumber',
    'buildingNumber',
    'managerId'
  ]);

  const user = new User(body);

  user.save((err, doc) => {
    if (err) return res.send(err);

    res.send(doc);
  });
});

app.patch('/users/:id', admin, (req, res) => {
  const update = _.pick(req.body, [
    'social',
    'dob',
    'password',
    'picture',
    'title',
    'firstName',
    'lastName',
    'isAdmin',
    'type',
    'roomNumber',
    'buildingNumber',
    'managerId'
  ]);

  if (update.password) {
    const salt = bcrypt.genSaltSync(10);
    update.password = bcrypt.hashSync(update.password, salt);
  }

  User.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: update
    },
    {
      new: true
    }
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
    'documents'
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
    'documents'
  ]);

  Procedure.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: update
    },
    {
      new: true
    }
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
    'primaryPhysician',
    'consultingPhysician',
    'social',
    'active',
    'healthInsurance',
    'phoneNumber',
    'picture',
    'documents'
  ]);

  if (body.active) body.activeSince = new Date();

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
    'primaryPhysician',
    'consultingPhysician',
    'social',
    'active',
    'healthInsurance',
    'phoneNumber',
    'picture',
    'documents'
  ]);

  if (!update.active) update.activeSince = null;

  if (update.active && !update.activeSince) update.activeSince = new Date();

  Patient.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: update
    },
    {
      new: true
    }
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

app.post('/messages', authenticate, (req, res) => {
  const body = _.pick(req.body, ['message', 'toUserId']);

  const message = new Message(body);

  message.date = new Date();
  message.fromUserId = req.user._id;

  message.save((err, doc) => {
    if (err) return res.send(err);

    res.send(doc);
  });
});

app.get('/messages', authenticate, (req, res) => {
  Message.find(
    { $or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }] },
    (err, docs) => {
      res.send(docs);
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
