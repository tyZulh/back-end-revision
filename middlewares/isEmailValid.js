module.exports = (req ,res , next) => {
  const emailRegEx= /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if(!emailRegEx.test(req.body.email)) {
    res.status(400).send('Bad request : wrong email format')
  } else {
    next()
  }
};
