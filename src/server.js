import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Sequelize from 'sequelize';
import { initWebRoutes } from './routes/web';
dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/./config/config.json')[env];

let app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('port :' + port);
});

// connect DB

const sequelize = new Sequelize(config.database, config.username, config.password, config);
// test connect DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log('_____________________________________');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
