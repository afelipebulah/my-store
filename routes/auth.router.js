const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = { sub: user.id, role: user.role };
      const options = { expiresIn: config.jwtExpiresIn };
      const token = jwt.sign(payload, config.jwtSecret, options);

      res.status(200).json({
        message: `usuario autenticado`,
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;