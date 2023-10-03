const jwt = require('jsonwebtoken');

const secret = 'myMariaPaz';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5NjM2MzQ2OSwiZXhwIjoxNjk2MzYzNTI5fQ.6Tn2FK2t-q_A6upNaq8GL915Xr-prmWr_DKmGcfggEU';

function verifyToken(token, secret){
    return jwt.verify(token,secret);
}

let json;
try {
    json = verifyToken(token, secret);
    console.log(json);
} catch (error) {
    console.log(`error: `, error.message)
}