import express from "express";
import homeController from "../controllers/homeController";

const app = express();
const port = 3000;

const router = express.Router();
export const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/users", homeController.getUsersApi);
  //
  router.get("/crud", homeController.getCrud);
  router.post("/post-crud", homeController.postCrud);

  //rest api
  return app.use("/", router);
};
