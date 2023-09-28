const bcrytp = require('bcrypt');

async function hashPass(){
    const myPass = 'Admin321*';
    console.log('hasheando el password: ',myPass);
    const hash = await bcrytp.hash(myPass,10);
    console.log('pass hasheado: ',hash);
}

async function verifyPass(pass){
    const myPass = pass;
    console.log('password recibido como param: ',myPass);
    const hash = '$2b$10$9UqDs575xq8rdgI3WdJuY.fcT7dt3QnAeUPW5zgM4MhJun1pNPqpa';
    const isMatch = await bcrytp.compare(pass,hash)
    console.log('resultado compare(pass,hash): ',isMatch);
}

//hashPass();
const myPass = 'Admin321*';
verifyPass(myPass);

