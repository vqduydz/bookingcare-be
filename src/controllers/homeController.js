import db from "../models/index";
import services from "../services/CRUD";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

const getUsersApi = (req, res) => {
  return res.render("users.ejs");
};

const createCrud = (req, res) => {
  return res.render("createcrud.ejs");
};

const postCrud = async (req, res) => {
  let mess = await services.createNewUser(req.body);
  res.redirect("/get-crud");
};

const getCrud = async (req, res) => {
  let data = await services.getAllUser();
  return res.render("getcrud.ejs", {
    data,
  });
};

const updateCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await services.getUserById(userId);
    return res.render("updatecrud.ejs", {
      userData,
    });
  }
  return res.send("----user-not--found !");
};

const putCrud = async (req, res) => {
  let data = req.body;
  await services.updateUserData(data);
  res.redirect("/get-crud");
};

const deleteCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await services.deleteUserById(userId);
    res.redirect("/get-crud");
  } else {
    return res.send("user not found");
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
