const bcrypt = require('bcrypt');
const { geraToken } = require('../auth/Token/Token');
const { getBarbeiros, getEmail } = require('../services/barbeiros.service');

const getBarbers = async (req, res) => {
    const dados = req.body;
    const resultBarbeiros = await getBarbeiros();
    // return res.status(200).json({ idCliente: dados.usuariotoken.data.userId.id, barbeiros: [...resultBarbeiros ] });
    return res.status(200).json(resultBarbeiros);
}

const login = async (req, res) => {
    const { email, password } = req.body;
  
    const result = await getEmail(email);
  
    if (result) {
      const isPasswordValid = await bcrypt.compare(password, result.password);
    //   console.log(isPasswordValid);
  
      if (isPasswordValid) {
        const { id, name, email, image } = result;
        const token = geraToken({ id, email });
        return res.status(200).json({
          id,
          name,
          email,
          image,
          token,
        });
      }
    }

    return res.status(401).json({ message: 'Email ou senha inválida' });
    // console.log(result);
    // return res.status(200).json(result.email)
  }

module.exports = { getBarbers, login };