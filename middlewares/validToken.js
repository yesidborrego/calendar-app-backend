const { response } = require('express');
const jwt = require('jsonwebtoken');

const validToken = (req, res = response, next) => {
  const token = req.header('x-token');

  try {
    const { uid, name } = jwt.verify(
      token,
      process.env.SECRET_JWT
    )

    req.uid = uid;
    req.name = name;

  } catch (error) {
    return res.status(401).json(
      {
        ok: false,
        msg: 'Invalid Token.'
      }
    );
  }
  next();
}

module.exports = { validToken };