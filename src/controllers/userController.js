import User from "../models/User";

export const getUsers = async (req, res) => {
  const { user } = request.body;

  const { id, name } = await User.create(users);

  return response.json({
    id,
    message: `User ${name} was register successful`,
  });
};
