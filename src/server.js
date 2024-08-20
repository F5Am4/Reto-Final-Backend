const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/posts", postRoutes);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Users API",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

module.exports = app;
