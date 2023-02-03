import db from '../models/index';
import crudServices from '../services/CRUD';

const user = db.User;

let getHomePage = async (req, res) => {
  try {
    let data = await user.findAll();
    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

const getUsersApi = (req, res) => {
  return res.render('users.ejs');
};

const createCrud = (req, res) => {
  return res.render('createcrud.ejs');
};

const postCrud = async (req, res) => {
  let mess = await crudServices.createNewUser(req.body);
  res.redirect('/get-crud');
};

const getCrud = async (req, res) => {
  let data = await crudServices.getAllUser();
  return res.render('getcrud.ejs', {
    data,
  });
};

const updateCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await crudServices.getUserById(userId);
    return res.render('updatecrud.ejs', {
      userData,
    });
  }
  return res.send('----user-not--found !');
};

const putCrud = async (req, res) => {
  let data = req.body;
  await crudServices.updateUserData(data);
  res.redirect('/get-crud');
};

const deleteCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await crudServices.deleteUserById(userId);
    res.redirect('/get-crud');
  } else {
    return res.send('user not found');
  }
};

export default {
  getHomePage,
  getUsersApi,
  createCrud,
  postCrud,
  getCrud,
  updateCrud,
  putCrud,
  deleteCrud,
};
