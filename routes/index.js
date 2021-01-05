const usersRoutes = require('./users');

module.exports = (app) => {
  app.use('/users', usersRoutes);
}