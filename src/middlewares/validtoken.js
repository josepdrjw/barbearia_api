const authToken = require('../auth/Token/Token');

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const token = authToken.validadeToken(authorization);
        req.body.usuariotoken = token; // adicio no corpo da requisição para que seja passado para as proximas camadas.
        // console.log(token);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = verifyToken;