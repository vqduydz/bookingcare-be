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
  router.post('/login', userController.handleLogin);
  router.get('/user', userController.handleGetUser);
  router.post('/user', userController.handleCreateNewUser);
  router.patch('/user-update', userController.handleUpdateUser);
  router.delete('/user-delete', userController.handleDeleteUser);

  return app.use('/v1/api', router);
};
