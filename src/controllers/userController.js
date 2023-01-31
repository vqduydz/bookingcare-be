import userServices from '../services/USER';

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      status: false,
      message: 'Missing input',
    });
  }
  let result = await userServices.handleLogin(email, password);
  const { code, data } = result;
  return res.status(code).json({
    ...data,
  });
};

const handleGetUser = async (req, res) => {
  let id = req.body.id;
  let result = await userServices.getUser(id);
  const { code, data } = result;
  return res.status(code).json({
    ...data,
  });
};

const handleCreateNewUser = async (req, res) => {
  let result = await userServices.createNewUser(req.body);
  const { code, data } = result;
  return res.status(code).json({
    ...data,
  });
};

export default {
  handleLogin,
  handleGetUser,
  handleCreateNewUser,
};
