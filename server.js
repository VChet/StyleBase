const express = require("express");

const config = require("./config");
const {
  addExpressMiddleware,
  CORSMiddleware
} = require("./middleware");
const routesApi = require("./api/routes-api");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || config.appPort;

CORSMiddleware(app);
addExpressMiddleware(app);

app.use(express.static("public"));
app.use("/api", routesApi);
app.use(routes);

app.set("port", PORT);
app.listen(app.get("port"), () => {
  console.log(`Server is up and running on port ${PORT}`);
});

module.exports = app;
