const bcrypt = require('bcrypt');
const services = require('../services/clientes.service');
const { geraToken } = require('../auth/Token/Token');

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await services.getEmail(email);

  if (result) {
    const isPasswordValid = await bcrypt.compare(password, result.password);
    console.log(isPasswordValid);

    if (isPasswordValid) {
      const { id, name, email, image } = result;
      const token = geraToken({ id, email });
      return res.status(200).json({
        name,
        email,
        image,
        token,
      });
    }
  }
  // console.log(`senha fornecida ${password}`);
  // console.log(`senha no banco ${result.password}`);
  return res.status(401).json({ message: 'Email ou senha inválida' });
}

const cadClientes = async (req, res) => {
    const { email } = req.body;
    const result = await services.getEmail(email);
    if (result === null) {
        // return res.status(200).json({ message: 'email não existe' });
        const dados = req.body;
        const resultCad = await services.cadClientes(dados);
        const { id, name, email, image } = resultCad;
        const token = geraToken({ id: resultCad.dataValues.id, email });
        return res.status(201).json({
            name,
            email,
            image: null,
            token,
        });
        
    }
    if (result.email === email) {
        return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    // const dados = req.body;
    // const resultCad = await services.cadClientes(dados);
    // return res.status(201).json(resultCad);
}

module.exports = { login, cadClientes };