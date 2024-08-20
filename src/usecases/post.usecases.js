const Post = require("../models/post.model");
const createError = require("http-errors");
// const User = require("../models/user.model");

// Función 'create new post'
async function create(data) {
  const newPost = await Post.create(data);
  return newPost;
}

// Función 'all posts'
async function getAll({ search }) {
  const query = search ? { title: new RegExp(search, "i") } : {};
  const posts = await Post.find(query);
  return posts;
}

// Función 'post by ID'
async function getById(id) {
  const post = await Post.findById(id);
  return post;
}

// Función 'update post id'
async function update(id, newData) {
  const postFound = await Post.findById(id);

  if (!postFound) {
    throw createError(404, "Post not found 👎");
  }

  Object.assign(postFound, newData);
  await postFound.save();
  return postFound;
}

// Función 'delete post'
async function deleteById(id, userId) {
  const postFound = await Post.findById(id);

  if (!postFound) {
    throw createError(404, "Post not found");
  }

  if (postFound.user.toString() !== userId.toString()) {
    throw createError(403, "Not authorized to delete this post");
  }

  await postFound.remove();
  return postFound;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
