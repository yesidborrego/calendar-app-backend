/**
 * Rutas de usuario: /auth
 * host + /api/auth
 **/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { filedsValiadate } = require('../middlewares/filedsValiadate');
const { validToken } = require('../middlewares/validToken');

router.post(
  '/new',
  [ // Middlewares
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    check('password', 'The password must least 6 characters').isLength({min: 6}),
    filedsValiadate
  ],
  createUser
);

router.post(
  '/',
  [ // Middlewares
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    check('password', 'The password must least 6 characters').isLength({min: 6}),
    filedsValiadate
  ],
  loginUser
)

router.get('/renew', validToken, renewToken)

module.exports = router;