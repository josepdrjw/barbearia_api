const jswbToken = require('jsonwebtoken'); // importa a biblioteca do jwt "jsonwebtoken"

const secret = process.env.JWT_SECRET; // variavel de ambiente para conceder acesso ao jwt

const jwtConf = {
    algorithm: 'HS256',
    expiresIn: '10min', // tempo que irá expirar o token deixando de ser valido
};

const tokenProvisiorio = (userId) => {
    const token = jswbToken.sign({ data: { userId } }, secret, jwtConf);
    // console.log(`tkGerado ${token}`);
    return token;
};

const validadeTokenProvisiorio = (authorization) => {
    const info = jswbToken.verify(authorization, secret);
    // console.log(info);
    return info;
};

module.exports = { tokenProvisiorio, validadeTokenProvisiorio };