const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userLogin = (request, response, next) => {
  User.find({ email: request.body.user })
    .select("+password")
    .then((user) => {
      checkPassword(user, request.body.password).then((result) => {
        if (result) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          });

          const options = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 100
            ),
            httpOnly: true,
          };

          if (process.env.NODE_ENV === "production") {
            options.secure = true;
          }

          response.status(200).json({
            status: "Success",
            message: "User matched!",
            token,
            user,
          });
        } else {
          response.status(400).json({
            status: "Error",
            message: "Passwords do not match!",
          });
        }
      });

    })
    .catch((findError) => {
      response.status(400).json({
        status: "Error",
        message: findError.message,
      });
    });
};
function checkPassword(user, password) {
  return new Promise((resolve) => {
    bcrypt.compare(password, user[0].password, function (err, result) {
      resolve(result);
    });
  });
}
exports.userRegister = (request, response, next) => {
  User.create(request.body)
    .then((user) => {
      response.status(200).json({
        status: "Success",
      });
    })
    .catch((findError) => {
      response.status(400).json({
        status: "Error",
        code: findError,
        message: findError.message,
      });
    });
};
