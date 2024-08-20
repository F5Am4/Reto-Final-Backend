const User = require("../models/user.model");

const createError = require("http-errors");
const encryption = require("../lib/encryption");
const jwt = require("../lib/jwt");

async function signUp(data) {
  const user = await User.findOne({ email: data.email });

  if (user) {
    throw createError(400, "Email already exists");
  }

  if (!data.password) {
    throw createError(400, "Password is required");
  }

  if (data.password.length < 6) {
    throw createError(400, "Password must be at least 6 characters");
  }

  const password = encryption.encrypt(data.password);

  data.password = password;

  const newUser = await User.create(data);

  return newUser;
}

async function login(data) {
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) {
    throw createError(401, "Invalid email or password");
  }

  const isValidPassword = await encryption.compare(
    data.password,
    user.password
  );

  if (!isValidPassword) {
    throw createError(401, "Invalid email or password");
  }

  const token = jwt.sign({ id: user._id });

  return token;
}

async function create(data) {
  const user = await User.create(data);
  return user;
}

module.exports = {
  signUp,
  login,
  create,
};
