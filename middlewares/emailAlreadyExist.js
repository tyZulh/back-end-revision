const { findOneByEmail } = require('../models/usersModel');

module.exports = async (req, res, next) => {
  const user = await findOneByEmail(req.body.email)
  if(user.length) {
    res.status(400).send('Bad request : user already exist')
  } else {
    next()
  }
};
