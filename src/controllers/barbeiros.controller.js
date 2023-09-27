const bcrypt = require('bcrypt');
const { geraToken } = require('../auth/Token/Token');
const { getBarbeiros, getEmail, cadUsuario } = require('../services/barbeiros.service');


const cadastroNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  const nivelDefault = 3;
  const dados = { name, email, password, nivelDefault }
  const email_barbeiro = req.body.usuariotoken.data.userId.email

  const result = await getEmail(email_barbeiro);

  if (result.nivel !== 1) {
    return res.status(404).json({ message: 'Usuário sem permissão' });
  }
  
  const cadastro = await cadUsuario(dados);

  if(cadastro) {
    return res.status(201).json({ message: `Usuário cadastrado com sucesso!` })
  }

}

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

module.exports = { getBarbers, login, cadastroNewUser };