const jwt = require('jsonwebtoken');

const secret = 'myMariaPaz';
const payload = {
    sub: 1,
    role: 'customer'
};
const jwtConfig = {
    expiresIn: '60s'
};

function signToken(payload, secret, jwtConfig){
    return jwt.sign(payload,secret, jwtConfig);
}

const token = signToken(payload, secret, jwtConfig);
console.log(token);