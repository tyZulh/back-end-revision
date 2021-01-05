const mysql = require('../db');
const bcrypt = require('bcryptjs');

const findAll = async () => {
  const result = await mysql.query('SELECT firstname, lastname, email, id FROM user');
  return result[0];
};

const findOne = async (id) => {
  const result = await mysql.query(`SELECT firstname, lastname, email, id FROM user WHERE id = ?`, id);
  return result[0];
}

const findOneByEmail = async (email) => {
  const result = await mysql.query(`SELECT firstname, lastname, email, id FROM user WHERE email = ?`, email)
  return result[0];
}

const createOne = async (body) => {
  body.password = bcrypt.hashSync(body.password, 10)
  const result = await mysql.query('INSERT INTO user SET ?', body);
  return findOne(result[0].insertId);
}

const authenticate = async (body) => {
  const user = await mysql.query('SELECT password, id FROM user WHERE email = ?', body.email);
  const passwordIsValid = bcrypt.compareSync(body.password, user[0][0].password);
  return { passwordIsValid, id: user[0][0].id }
}

module.exports = {
  findAll,
  findOne,
  findOneByEmail,
  createOne,
  authenticate
};
