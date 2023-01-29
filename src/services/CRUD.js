import db from "../models/index";
const { v4: uuidv4 } = require("uuid");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);

let createNewUser = async (data) => {
  console.log("data-----");

  console.log(data);
  const {
    email,
    password,
    confirmpassword,
    firstName,
    lastName,
    position,
    phonenumber,
    gender,
    address,
    image,
  } = data;

  return new Promise(async (resolve, reject) => {
    try {
      let hashPassFromBcrypt = await hashPassword(confirmpassword);
      await db.User.create({
        id: uuidv4(),
        email,
        password: hashPassFromBcrypt,
        name: `${firstName} ${lastName}`,
        position,
        phonenumber,
        gender,
        address,
        image,
      });
      resolve("created");
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
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  createNewUser,
  getAllUser,
};
