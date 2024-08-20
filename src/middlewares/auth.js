const express = require("express");
// const createError = require("http-errors");

const UsersUseCases = require("../usecases/user.usecases");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const token = await UsersUseCases.login(data);

    res.json({
      success: true,
      message: "Logged in",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
    // next(error); // Descomenta esta línea si tienes un middleware de manejo de errores global
  }
});

module.exports = router;
