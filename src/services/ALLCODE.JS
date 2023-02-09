import db from '../models/index';
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync('B4c0//', salt);

const Allcode = db.Allcode;

let getAllcode = async (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = type
        ? await Allcode.findAll({
            where: { type },
          })
        : await Allcode.findAll();

      !data.length
        ? resolve({
            code: 404,
            status: false,
            error: {
              message: 'Allcode does not exist',
            },
          })
        : resolve({
            code: 200,
            status: true,
            data: {
              message: 'ok',
              data,
            },
          });
    } catch (error) {
      reject(error);
    }
  });
};

let createNewAllcode = async (data) => {
  const { email, password, firstName, lastName, position, phonenumber, gender, address, image } = data;

  return new Promise(async (resolve, reject) => {
    try {
      let AllcodeIsExists = await checkAllcodeExists(email);
      if (!AllcodeIsExists) {
        let hashPassFromBcrypt = await hashPassword(password);
        await Allcode.create({
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
            message: 'Allcode created successfully',
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

let checkAllcodeExists = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Allcode = await Allcode.findOne({
        where: { email },
      });
      if (Allcode) {
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

let updateAllcodeData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Allcode = await Allcode.findOne({
        where: {
          id: data.id,
        },
      });
      if (Allcode) {
        const { id, ...dataUpdate } = data;
        await Allcode.set(dataUpdate);
        await Allcode.save();
        resolve({
          code: 200,
          status: true,
          data: {
            message: 'Allcode updated successfully',
          },
        });
      } else {
        resolve({
          code: 404,
          status: false,
          error: {
            message: 'Allcode does not exist',
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteAllcodeById = (AllcodeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Allcode = await Allcode.findOne({
        where: { id: AllcodeId },
      });
      if (Allcode) {
        await Allcode.destroy();
        resolve({
          code: 200,
          status: true,
          data: {
            message: 'Allcode deleted successfully',
          },
        });
      } else {
        resolve({
          code: 404,
          status: false,
          error: {
            message: 'Allcode does not exist',
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getAllcode,
  createNewAllcode,
  updateAllcodeData,
  deleteAllcodeById,
};
