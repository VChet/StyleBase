const express = require("express");
require("dotenv").config();

const {
  addExpressMiddleware,
  CORSMiddleware
} = require("./middleware");
const routesApi = require("./api/routes-api");
const routes = require("./routes");

const app = express();
const PORT = process.env.NODE_PORT;

CORSMiddleware(app);
addExpressMiddleware(app);

app.use(express.static("public"));
app.use("/api", routesApi);
app.use(routes);

app.set("port", PORT);
app.listen(app.get("port"), () => {
  console.log(`Server is up and running. Host port: ${PORT}. External port: ${process.env.DOCKER_CONTAINER_PORT}`);
});

module.exports = app;
