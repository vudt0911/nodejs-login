import express from "express";
import initResources from "./src/bases/route/Index.js";
import accountResource from "./src/resources/account/Index.js";
import getJwtFilter from "./src/configs/jwt.config.mjs";
import "./src/repositories/Index.mjs";
import bodyParser from "body-parser";
import multer from "multer";
import CustomExceptionHandler from "./src/resources/exception/CustomExceptionHandler.mjs";

const app = express();

// parse application/json
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(multer().array());
app.use(getJwtFilter());

initResources(app, accountResource);

app.use(CustomExceptionHandler);
const server = app.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

function for404(req, res) {
  const obj = {
    message: "Not Found Path",
    status: 404,
    url: req.url,
  };
  res.status(404).send(obj);
}
