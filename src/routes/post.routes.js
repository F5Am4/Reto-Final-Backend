const express = require("express");

const postUsecases = require("../usecases/post.usecases");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/", async (request, response) => {
  try {
    const posts = await postUsecases.getAll();

    response.json({
      success: true,
      message: "All posts",
      data: { posts },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const postData = request.body;
    const newPost = await postUsecases.create(postData);

    response.json({
      success: true,
      message: "Post created",
      data: { newPost },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const user = request.body;
    const deletedPost = await postUsecases.deleteById(id, user);

    response.json({
      success: true,
      message: "Post deleted",
      data: { post: deletedPost },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const postData = request.body;
    const updatedPost = await postUsecases.update(id, postData);

    response.json({
      success: true,
      message: "Post updated",
      data: { post: updatedPost },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
