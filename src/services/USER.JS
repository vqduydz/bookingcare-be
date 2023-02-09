import db from '../models/index';
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync('B4c0//', salt);

const User = db.User;

let handleLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await checkUser(email, password);
      resolve(result);
    } catch (error) {
      resolve(error);
    }
  });
};

let checkUser = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        where: { email },
        raw: true,
      });
      if (!user) {
        resolve({
          code: 404,
          status: false,
          error: {
            message: 'Email does not exist !',
          },
        });
      } else {
        bcrypt.compare(password, user.password, function (err, results) {
          if (err) {
            reject(err);
          }
          if (results) {
            const { password: _, ...dataUser } = user;
            resolve({
              code: 200,
              status: true,
              data: {
                message: 'Login success',
                data: dataUser,
              },
            });
          } else {
            resolve({
              code: 401,
              status: false,
              error: {
                message: 'Wrong password !',
              },
            });
          }
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        let data = await User.findOne({
          where: { id },
          attributes: { exclude: ['password'] },
        });

        data
          ? resolve({
              code: 200,
              status: true,
              data: {
                message: 'ok',
                data,
              },
            })
          : resolve({
              code: 404,
              status: false,
              error: {
                message: 'User does not exist',
                // data,
              },
            });
      } else {
        let data = await User.findAll({
          attributes: { exclude: ['password'] },
          order: [['createdAt', 'DESC']],
        });
        resolve({
          code: 200,
          status: true,
          data: {
            message: 'ok',
            data,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = async (data) => {
  const { email, password, firstName, lastName, position, phonenumber, gender, address, image } = data;

  return new Promise(async (resolve, reject) => {
    try {
      let userIsExists = await checkUserExists(email);
      if (!userIsExists) {
        let hashPassFromBcrypt = await hashPassword(password);
        await User.create({
          email,
          password: hashPassFromBcrypt,
          firstName,
          lastName,
          position,
          phonenumber,
          gender,
          address,
          image,
        });
        resolve({
          code: 200,
          status: true,
          data: {
            message: 'User created successfully',
          },
        });
      } else {
        resolve({
          code: 422,
          status: false,
          error: {
            message: 'Email already exists',
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserExists = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        where: { email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPass = await bcrypt.hashSync(password, salt);
      resolve(hashPass);
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        where: {
          id: data.id,
        },
      });
      if (user) {
        const { id, ...dataUpdate } = data;
        await user.set(dataUpdate);
        await user.save();
        resolve({
          code: 200,
          status: true,
          data: {
            message: 'User updated successfully',
          },
        });
      } else {
        resolve({
          code: 404,
          status: false,
          error: {
            message: 'User does not exist',
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
        resolve({
          code: 200,
          status: true,
          data: {
            message: 'User deleted successfully',
          },
        });
      } else {
        resolve({
          code: 404,
          status: false,
          error: {
            message: 'User does not exist',
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  handleLogin,
  getUser,
  createNewUser,
  updateUserData,
  deleteUserById,
};
