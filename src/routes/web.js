import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

const app = express();
const port = 3000;

const router = express.Router();
export const initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/users', homeController.getUsersApi);
  //
  router.get('/create', homeController.createCrud);
  router.post('/post-crud', homeController.postCrud);
  router.get('/get-crud', homeController.getCrud);
  router.get('/update-crud', homeController.updateCrud);
  router.post('/put-crud', homeController.putCrud);
  router.get('/delete-crud', homeController.deleteCrud);
  //rest api
  router.post('/api/login', userController.handleLogin);
  router.get('/api/user', userController.handleGetUser);
  router.post('/api/user', userController.handleCreateNewUser);

  return app.use('/', router);
};
