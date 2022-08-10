const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.name;
  bcrypt.hash(password, 12).then(hashedPassword => {
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    return user.save();
  }).then(user => {
    res.status(201).json({ message: 'User Signed Successfully.', user });
  }).catch(err => {
    res.status(500);
  })
}

module.exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let user;
  User.find({ email })
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: 'Email address is not found!',
        });
      }
      user = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        res.status(404).json({
          message: 'User is not authenticated!',
        });
      }
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString()
        },
        'somesecretkey',
        {
          expiresIn: '1h'
        }
      );
      res.status(200), json({
        token: token,
        userId: user._id.toString()
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    }
    );
}