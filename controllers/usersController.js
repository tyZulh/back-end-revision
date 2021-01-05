const jwt = require('jsonwebtoken');
const { TOKEN_SALT } =require('../env');
const {
  findAll,
  findOne,
  createOne,
  authenticate
} = require('../models/usersModel');

const getAll = async (req,res) => {
  const data = await findAll();
  res.status(200).json(data);
};

const getOne = async (req, res) => {
  const data = await findOne(req.params.id);
  res.status(200).json(data);
}

const handlePost = async (req, res) => {
  const data = await createOne(req.body);
  res.status(201).json(data);
}

const signIn = async (req, res) => {
  const data = await authenticate(req.body);
  if (data.passwordIsValid) {
    const token = jwt.sign(
      { id: data.id },
      TOKEN_SALT,
    );
    res.header('Access-Control-Expose-Headers', 'X-access-token');
    res.set('X-access-token', token);
    res.status(200).json({ auth: true});
  } else {
    res.status(401).send('Unauthorized')
  }
}

module.exports = {
  getAll,
  getOne,
  handlePost,
  signIn
};
