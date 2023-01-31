import db from '../models/index';
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync('B4c0//', salt);

let createNewUser = async (data) => {
  const { email, password, confirmpassword, firstName, lastName, position, phonenumber, gender, address, image } = data;

  return new Promise(async (resolve, reject) => {
    try {
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
      resolve('created');
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

let getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({});
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findOne({
        where: { id: userId },
      });

      if (users) resolve(users);
      else resolve({ data: 'emty' });
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: data.id,
        },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  createNewUser,
  getAllUser,
  getUserById,
  updateUserData,
  deleteUserById,
};
