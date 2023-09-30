const passport = require('passport');

const LocalStrategy = require('./../utils/auth/strategies/local.strategy');

passport.use(LocalStrategy);