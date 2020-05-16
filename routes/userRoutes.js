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
      res.data = UserService.getAllUsers();
    } catch (error) {
      res.error = error;
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
      res.data = UserService.search({ id: req.params.id });
    } catch (error) {
      res.error = error;
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
      res.data = UserService.createUser(req.body);
    } catch (error) {
      res.error = error;
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
      res.data = UserService.updateUser(req.params.id, dataToUpdate);
    } catch (error) {
      res.error = error;
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
      res.data = UserService.deleteUser(req.params.id);
    } catch (error) {
      res.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
