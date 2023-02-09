import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import allcodeController from '../controllers/allcodeController';

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
  //users
  router.post('/login', userController.handleLogin);
  router.get('/user', userController.handleGetUser);
  router.post('/user', userController.handleCreateNewUser);
  router.patch('/user-update', userController.handleUpdateUser);
  router.delete('/user-delete', userController.handleDeleteUser);
  //allcodes
  router.get('/allcodes', allcodeController.handleGetAllcode);
  router.post('/allcodes', allcodeController.handleCreateNewAllcode);
  router.patch('/allcodes-update', allcodeController.handleUpdateAllcode);
  router.delete('/allcodes-delete', allcodeController.handleDeleteAllcode);

  return app.use('/v1/api', router);
};
