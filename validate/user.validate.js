const joi = require('joi');

const userSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(1).trim().required(),
  password: joi.string().min(6).required(),
});
const userValidator = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(500).json(error);
  } else {
    next();
  }
};

module.exports = userValidator;
