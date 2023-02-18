import express from 'express';
import userController from '../controllers/userController';
import authenticateToken from '../middlewares/middleware';

const router = express.Router();

const app = express();
const port = 3000;

export const initWebRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.send('test');
  });
  // log in
  router.post('/login', userController.handleLogin);
  router.get('/login', authenticateToken, (req, res) => res.json(req.user));
  // forgot password
  router.post('/forgot-password', userController.forgotPassword);
  // reset password
  router.patch('/reset-password/:token', userController.resetPassword);
  // sign up - create user
  router.post('/user', userController.createUser);
  // get user
  router.get('/user', userController.getUser);
  // update user data
  router.patch('/user', userController.updateUserById);
  // delete user
  router.delete('/user', userController.deleteUserById);

  return app.use('/v1/api', router);
};
