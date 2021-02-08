const jwt = require('jsonwebtoken');

const genJWT = async (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {uid, name};

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: '2h'
      },
      (err, token) => {
        if(err) {
          console.error(error);
          reject('Error al generar el token')
        }
        resolve(token);
      }
    );
  });
}

module.exports = { genJWT };