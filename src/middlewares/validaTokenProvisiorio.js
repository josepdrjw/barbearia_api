const { validadeTokenProvisiorio } = require("../auth/Token/tokenProvisorio");


const verifyTokenProvisiorio = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const token = validadeTokenProvisiorio(authorization)
        req.body.usuariotoken = token; // adicio no corpo da requisição para que seja passado para as proximas camadas.
        // console.log(token);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = verifyTokenProvisiorio;