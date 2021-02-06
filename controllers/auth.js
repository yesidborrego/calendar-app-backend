const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { genJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({
        ok: false,
        msg: 'Email is already in use.'
      });
    }
    user = new User(req.body);
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    await user.save();

    // Generar Token
    const token = await genJWT(user.id, user.name);

    res.status(201).json(
      {
        ok: true,
        uid: user.id,
        name: user.name,
        token
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Contact the application administrator.'
      });
  }
}

const loginUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(user && bcrypt.compareSync(password, user.password)){
      const token = await genJWT(user.id, user.name);
      return res.status(200).json(
        {
          ok: true,
          uid: user.id,
          name: user.name,
          token
        }
      );
    }

    res.status(400).json(
      {
        ok: false,
        msg: 'Invalid email or password.',
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the application administrator.'
    });
  }

}

const renewToken = async (req, res = response) => {
  const { uid, name } = req
  const token = await genJWT(uid, name);
  res.json(
    {
      ok: true,
      token
    });
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}