import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import { initWebRoutes } from "./routes/web";
import connectDB from "../src/config/connectDB";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine.configViewEngine(app);
initWebRoutes(app);

connectDB();
let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("port :" + port);
});
