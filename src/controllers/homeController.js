import db from "../models/index";
import services from "../services/CRUD";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
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
  console.log("mess, req.body-----");
  console.log(mess, req.body);
  return res.send("----post-Crud");
};

const getCrud = async (req, res) => {
  let data = await services.getAllUser();
  return res.render("getcrud.ejs", {
    data,
  });
};

export default {
  getHomePage,
  getUsersApi,
  createCrud,
  postCrud,
  getCrud,
};
