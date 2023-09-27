const validator = require('validator');

function validEmail(req, res, next) {
  const email = req.body.email;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  next();
}

module.exports = validEmail;
