const jwt = require('jsonwebtoken');
const { TOKEN_SALT } = require('../env');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, TOKEN_SALT, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized')
    } else{
      next()
    }
  })
};
