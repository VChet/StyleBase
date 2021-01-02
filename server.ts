import express, { Application } from "express";

import config from "./config";
import addExpressMiddleware from "./middleware";
import routesApi from "./api/routes-api";
import routes from "./routes";

const app: Application = express();
const PORT = process.env.PORT || config.appPort;

addExpressMiddleware(app);

app.use(express.static("public"));
app.use("/api", routesApi);
app.use(routes);

app.set("port", PORT);
app.listen(app.get("port"), () => {
  console.log(`Server is up and running on port ${PORT}`);
});

module.exports = app;
