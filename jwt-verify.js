const jwt = require('jsonwebtoken');

const secret = 'myMariaPaz';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5NjM3Mzk1NiwiZXhwIjoxNjk2Mzc0MDE2fQ.4stH0a87D03WUO0yuN29RB01oAzpopcYGHxkbWKTKbE';

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