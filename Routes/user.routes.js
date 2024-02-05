const express = require('express');
const { User, Project } = require('../models/');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const bcrypt = require('bcrypt');
const userValidator = require('../validate/user.validate');

let user = express.Router();

user.post('/user', userValidator, async (req, res) => {
  const { name, email, password } = req.body;

  let salt = await bcrypt.genSalt(10);
  let hashpass = await bcrypt.hash(password, salt);
  try {
    let userData = await User.findOne({
      where: {
        email,
      },
    });

    if (userData) {
      return res.status(500).json({ msg: 'email alrady exists' });
    } else {
      userData = await User.create({
        name,
        email,
        password: hashpass,
      });
      const token = jwt.sign(
        { userId: userData.id },
        process.env.JWT_SECREAT_KEY,
        { expiresIn: '7d' }
      );

      createInbox(userData.id);

      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: 'Name cannot be empty' });
  }
});

user.get('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let userData = await User.findOne({
      where: {
        email,
      },
    });

    if (userData) {
      if (email && password) {
        let verify = bcrypt.compare(password, userData.password);

        if (verify) {
          const token = jwt.sign(
            { userId: userData.id },
            process.env.JWT_SECREAT_KEY
          );

          res.json({
            status: 'successful',
            msg: 'Successfully login',
            token,
          });
        }
      } else {
        return res
          .status(500)
          .json({ msg: 'email or password cannot be empty' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Name cannot be empty' });
  }
});

async function createInbox(userId) {
  await Project.create({
    name: 'inbox',
    userId,
    is_inbox_project: true,
  });
}

module.exports = user;
