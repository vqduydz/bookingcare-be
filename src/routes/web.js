import express from "express";
import homeController from "../controllers/homeController";

const app = express();
const port = 3000;

const router = express.Router();
export const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/users", homeController.getUsersApi);
  //
  router.get("/create", homeController.createCrud);
  router.post("/post-crud", homeController.postCrud);
  router.get("/get-crud", homeController.getCrud);
  router.get("/update-crud", homeController.updateCrud);
  router.post("/put-crud", homeController.putCrud);

  //rest api
  return app.use("/", router);
};
