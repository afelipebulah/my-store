const { Strategy } = require('passport-local');
const UserService = require('./../../../services/user.services');
const boom = require('@hapi/boom');
const bcrytp = require('bcrypt');

const service = new UserService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {
        try {
            const user = await service.searchUserByEmail(email);
            if (!user) {
                done(boom.unauthorized(), false);
                return;
            }

            const isMatch = await bcrytp.compare(password, user.password);
            if (!isMatch) {
                done(boom.unauthorized(), false);
                return;
            }

            delete user.dataValues.password;

            done(null, user);

        } catch (error) {
            done(error, false);
        }
    });

module.exports = LocalStrategy;