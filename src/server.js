import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config app
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// Port === undefined => port = 6969

app.listen(port, () => {
  console.log("Backend NodeJS is running on the port: " + port);
});
