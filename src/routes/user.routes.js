const express = require("express");
const createError = require("http-errors");

const UserUseCases = require("../usecases/user.usecases");
// const auth = require("../middlewares/auth");

const router = express.Router();

// router.use(auth);

/*
router.get("/", auth, async (request, response) => {
  try {
    const users = await userUseCases.getAll();

    response.json({
      success: true,
      message: "All users",
      data: { users },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});
*/

router.post("/", async (request, response) => {
  try {
    const data = request.body;
    const user = await UserUseCases.signUp(data);

    response.json({
      success: true,
      message: "User created",
      data: { user },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const user = await UserUseCases.getById(id);

    if (!user) {
      throw createError(404, "User not found");
    }

    response.json({
      success: true,
      message: "User by id",
      data: { user },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

/*
router.post("/", auth, async (request, response) => {
  try {
    const user = await request.body;
    const newUser = await UserUseCases.create(userData);

    response.json({
      success: true,
      message: "User created",
      data: { user: newUser },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});
*/

/*
router.patch("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const userData = request.body;
    const userUpdate = await userUseCases.updateById(id, userData);

    response.json({
      success: true,
      message: "User updated",
      data: { user: userUpdate },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});
*/

/*
router.delete("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;

    const userDeleted = await userUseCases.deleteById(id);

    response.json({
      success: true,
      message: "User deleted",
      data: { user: userDeleted },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});
*/

/*
router.post("/login", auth, async (request, response) => {
  try {
    const data = request.body;
    const token = await userUseCases.login(data);

    response.json({
      success: true,
      message: "User logged in",
      data: { token },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: "Error al iniciar sesión",
    });
  }
});
*/

module.exports = router;
