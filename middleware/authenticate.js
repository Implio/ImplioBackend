const User = require("../models/user");

var authenticate = (req,res,next) => {
    var token = req.header('x-auth');

    User.findByToken(token, (err, doc)=>{
        if(err)
            return res.status(400).send(err);

        req.user = doc;
        req.token = token;
        next();
    });
};

var admin = (req,res,next) => {
    var token = req.header('x-auth');

    User.findByToken(token, (err, doc)=>{
        if(err)
            return res.status(400).send(err);

        if (!doc.isAdmin)
          return res.status(401).send({message: 'You must be an admin to access this data.'})

        req.user = doc;
        req.token = token;
        next();
    });
};

module.exports = {authenticate, admin};
