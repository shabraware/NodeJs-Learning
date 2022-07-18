const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<b>Hello from / </b>')
});

module.exports = router;
