import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import viewEngine from './config/viewEngine';
import { initWebRoutes } from './routes/web';
/// Connecting to a database
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('bookingcare', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

///

let app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine.configViewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('port :' + port);
});
