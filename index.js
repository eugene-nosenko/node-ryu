const express = require("express");
const cors = require("cors");
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/index");
routes(app);

app.use("/", express.static("./client/build"));

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({ error: true, message: err.message });
  }
  next();
});

const port = 3050;
app.listen(port, () => {});

exports.app = app;
