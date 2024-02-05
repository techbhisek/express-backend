const jwt = require('jsonwebtoken');
const { User } = require('../models/');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(404)
      .json({ msg: 'authintication token is not available' });
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(
    token,
    process.env.JWT_SECREAT_KEY,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const data = await User.findByPk(decoded.userId);

      if (data) {
        req.user_id = decoded.userId;

        next();
      } else {
        res.status(500).json({ msg: 'user not exists' });
      }
    }
  );
};

module.exports = verifyToken;
