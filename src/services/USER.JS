import db from '../models/index';
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync('B4c0//', salt);

let handleLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await checkUser(email, password);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUser = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email },
      });
      if (!user) {
        resolve({
          code: 404,
          data: {
            status: false,
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
              data: {
                status: true,
                message: 'Login success',
                data: dataUser,
              },
            });
          } else {
            resolve({
              code: 401,
              data: {
                status: false,
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
        let data = await db.User.findOne({
          where: { id },
          attributes: { exclude: ['password'] },
        });

        data
          ? resolve({
              code: 200,
              data: {
                status: true,
                message: 'ok',
                data,
              },
            })
          : resolve({
              code: 404,
              data: {
                status: false,
                message: 'User not found',
                // data,
              },
            });
      } else {
        let data = await db.User.findAll({
          attributes: { exclude: ['password'] },
          order: [['createdAt', 'DESC']],
        });
        resolve({
          code: 200,
          data: {
            status: true,
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
  const { email, password, confirmpassword, firstName, lastName, position, phonenumber, gender, address, image } = data;

  return new Promise(async (resolve, reject) => {
    try {
      let userIsExists = await checkUserExists(email);
      if (!userIsExists) {
        let hashPassFromBcrypt = await hashPassword(confirmpassword);
        await db.User.create({
          id: uuidv4(),
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
          data: {
            status: true,
            message: 'User created successfully',
          },
        });
      } else {
        resolve({
          code: 422,
          data: {
            status: false,
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
      let user = await db.User.findOne({
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

export default {
  createNewUser,
  handleLogin,
  getUser,
};
