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
  const { code, ...data } = result;
  return res.status(code).json({
    ...data,
  });
};

const handleGetUser = async (req, res) => {
  let id = req.body.id;
  let result = await userServices.getUser(id);
  const { code, ...data } = result;
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

const handleUpdateUser = async (req, res) => {
  let dataUpdate = req.body;
  let result = await userServices.updateUserData(dataUpdate);
  const { code, data } = result;
  return res.status(code).json({
    ...data,
  });
};

const handleDeleteUser = async (req, res) => {
  let userId = req.body.id;
  if (userId) {
    let result = await userServices.deleteUserById(userId);
    const { code, data } = result;
    return res.status(code).json({
      ...data,
    });
  } else {
    return res.status(404).json({
      status: false,
      message: 'User does not exist',
    });
  }
};

export default {
  handleLogin,
  handleGetUser,
  handleCreateNewUser,
  handleUpdateUser,
  handleDeleteUser,
};
