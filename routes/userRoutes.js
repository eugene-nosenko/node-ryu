const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// GET /api/users
router.get(
  "/",
  (req, res, next) => {
    try {
      const users = UserService.getAllUsers();
      req.data = users;
    } catch (err) {
      error.statusCode = 404;
      next(error);
    } finally {
      next();
    }
  },
  responseMiddleware
);

// GET /api/users/:id
router.get(
  "/:id",
  (req, res, next) => {
    try {
      const user = UserService.search({ id: req.params.id });
      req.data = user;
    } catch (err) {
      error.statusCode = 400;
      next(error);
    } finally {
      next();
    }
  },
  responseMiddleware
);

// POST /api/users
router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      const user = UserService.createUser(req.body);
      req.data = user;
    } catch (err) {
      error.statusCode = 400;
      next(error);
    } finally {
      next();
    }
  },
  responseMiddleware
);

// PUT /api/users/:id
router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    try {
      const dataToUpdate = req.body;
      const user = UserService.updateUser(req.params.id, dataToUpdate);
      req.data = user;
    } catch (err) {
      error.statusCode = 400;
      next(error);
    } finally {
      next();
    }
  },
  responseMiddleware
);

// DELETE /api/users/:id
router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const user = UserService.deleteUser(req.params.id);
      req.data = user;
    } catch (err) {
      error.statusCode = 404;
      next(error);
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
