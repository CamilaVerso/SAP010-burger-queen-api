const bcrypt = require('bcrypt');
const { User } = require('../models');

const createUser = async (req, resp, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return resp.status(400).json({ message: 'Todos os campos são obrigatários' }); // caso esteja faltando algum item vai aparecer a msg de erro
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return resp.status(400).json({ message: 'Este e-mail já está em uso' }); // aqui eu verifico se o email já foi cadastrado antes
    }

    const hashedPassword = bcrypt.hashSync(password, 10); // aqui cria a
    // hash da senha antes de salvar no banco de dados

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    resp.status(201).json(newUser);
  } catch (error) {
    next(error); // os erros serão tratados no middleware de erro
    // next({ status: 500, message: 'Erro interno do servidor.'}); pode ser assim tbm
  }
};

const getUsers = async (req, resp, next) => {
  try {
    const users = await User.findAll();
    return resp.json(users);
  } catch (error) {
    next(error); // os erros serão tratados no middleware de erro
    // next({ status: 500, message: 'Erro interno do servidor.'}); pode ser assim tbm
  }
};

const getUserById = async (req, resp, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return resp.status(404).json({ message: 'Usuário não encontrado' });
    }

    resp.status(200).json(user);
  } catch (error) {
    next(error); // os erros serão tratados no middleware de erro
    // next({ status: 500, message: 'Erro interno do servidor.'}); pode ser assim tbm
  }
};

const updateUser = async (req, resp, next) => {
  try {
    const { userId } = req.params;
    const { email, password, role } = req.body;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return resp.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.email = email || user.emal; // para atualizar o email
    // ou mantém o que já tem se não for digitado outro
    if (password) {
      user.password = bcrypt.hashSync(password, 10); // se a senha for
      // alterada, vai ser gerado um nodo hash p ela
    }

    user.role = role || user.role;

    await user.save(); // salva as atualizações

    resp.status(200).json(user);
  } catch (error) {
    next(error); // os erros serão tratados no middleware de erro
    // next({ status: 500, message: 'Erro interno do servidor.'}); pode ser assim tbm
  }
};

const deleteUser = async (req, resp, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return resp.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();

    resp.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    next(error); // os erros serão tratados no middleware de erro
    // next({ status: 500, message: 'Erro interno do servidor.'}); pode ser assim tbm
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

// module.exports = {
//   getUsers: (req, resp, next) => {
//   },
// };
