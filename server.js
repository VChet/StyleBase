const path = require("path");
const express = require("express");

const config = require("./config");
const { addExpressMiddleware } = require("./common");
const api = require("./api/routes");

const app = express();
const PORT = process.env.PORT || config.appPort;

addExpressMiddleware(app);

app.use(express.static("public"));
app.use("/api", api);

const clientIndex = path.join(__dirname, "public/index.html");
app.get("*", (req, res) => res.sendFile(clientIndex));

app.set("port", PORT);
app.listen(app.get("port"), () => {
  console.log(`Server is up and running on port ${PORT}`);
});

module.exports = app;
