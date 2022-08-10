const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('Authorizatoin');
  if (!token) {
    res.status(400).json({
      message: 'Not authenticated'
    })
  }
  let decodedToken;
  try {
    /* Returns the payload decoded if the signature is valid and optional expiration, 
       audience, or issuer are valid. If not, it will throw the error. */
    decodedToken = jwt.verify(token, 'somesecretkey');
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
  if (!decodedToken) {
    res.status(400).json({
      message: 'not authenticated'
    })
  }
  req.userId = decodedToken.userId;
  next();
}