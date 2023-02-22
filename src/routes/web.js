import express from 'express';
import userController from '../controllers/userController';
import { verifyToken, checkRole } from '../middlewares/middleware';

const router = express.Router();

const app = express();
const port = 3000;

export const initWebRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.send('test');
  });
  // log in
  router.post('/login', userController.getToken);
  router.get('/login', verifyToken, userController.handleLogin);
  // forgot password
  router.post('/forgot-password', userController.forgotPassword);
  // reset password
  router.patch('/reset-password/:token', userController.resetPassword);
  // sign up - create user
  router.post('/user', userController.createUser);

  // get user
  router.get('/user', verifyToken, checkRole(['Root', 'Admin', 'UserManage']), userController.getUser);
  // update user data
  router.patch(
    '/user',
    verifyToken,
    checkRole(['Customer', 'Root', 'Admin', 'UserManage']),
    userController.updateUserById,
  );
  // delete user
  router.delete(
    '/user',
    verifyToken,
    checkRole(['Customer', 'Root', 'Admin', 'UserManage']),
    userController.deleteUserById,
  );

  return app.use('/v1/api', router);
};
