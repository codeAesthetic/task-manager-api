const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const taskRoutes = require("./routes/task");

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.json({
    error: "Internal Server Error",
  });
});

routes.get("/", (req, res) => {
  res.send("<h1>Welcome to Task Manager API</h1>");
});

routes.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Serving on port " + PORT);
});
