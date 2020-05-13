const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();
router.post(
  "/",
  (req, res, next) => {
    try {
      // TODO: Implement login action
      //res.data = data;
      console.log(req);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// TODO: Implement route controllers for user

module.exports = router;
