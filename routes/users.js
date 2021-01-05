const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const usersController = require('../controllers/usersController');
const isEmailValid = require('../middlewares/isEmailValid');
const emailAlreadyExist = require('../middlewares/emailAlreadyExist');
const isTokenValid = require('../middlewares/isTokenValid');

router.get('/', isTokenValid, usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', isEmailValid, asyncHandler(emailAlreadyExist), usersController.handlePost);
router.post('/signIn',isEmailValid ,usersController.signIn);

module.exports = router;
