const bcrypt = require('bcrypt');
const { getEmail, getClientesAll, cadastroClientes } = require('../services/clientes.service');
const { checkAgendamentoCliente } = require('../services/agendamentos.service');
const { geraToken } = require('../auth/Token/Token');

const consultAgenda = async (id) => {
  const resul = await checkAgendamentoCliente(id);
  return resul;
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await getEmail(email);

  // let idAgenda = null;


  if (result) {
    const r = await consultAgenda(result.id);
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
        agenda: r || null,
      });
    }
  }

  // if (result) {
  //   const isPasswordValid = await bcrypt.compare(password, result.password);
  //   console.log(isPasswordValid);

  //   if (isPasswordValid) {
  //     const { id, name, email, image } = result;
  //     const token = geraToken({ id, email });
  //     return res.status(200).json({
  //       name,
  //       email,
  //       image,
  //       token,
  //       agenda: null,
  //     });
  //   }
  // }

  return res.status(401).json({ message: 'Email ou senha inválida' });
}


const cadClientes = async (req, res) => {
    const { email } = req.body;
    const result = await getEmail(email);
    if (result === null) {
        // return res.status(200).json({ message: 'email não existe' });
        const dados = req.body;
        const resultCad = await cadastroClientes(dados);
        const { id, name, email, image } = resultCad;
        const token = geraToken({ id: resultCad.dataValues.id, email });
        return res.status(201).json({
            name,
            email,
            image: null,
            token,
            agenda: null,
        });
        
    }
    if (result.email === email) {
        return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    // const dados = req.body;
    // const resultCad = await services.cadClientes(dados);
    // return res.status(201).json(resultCad);
}

const todoCleintes = async (req, res) => {
  const todo = await getClientesAll();
  res.status(200).json(todo);
}

module.exports = { login, cadClientes, todoCleintes };
