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
      res.send(users);
    } catch (err) {
      res.status(404).send({ error: true, message: err.message });
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
      res.send(user);
    } catch (err) {
      res.status(404).send({ error: true, message: err });
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
      res.send(user);
    } catch (err) {
      res.status(400).send({ error: true, message: err });
    } finally {
      next();
    }
  },
  responseMiddleware
);

// PUT /api/users/:id
router.put(
  "/:id",
  (req, res, next) => {
    try {
      const dataToUpdate = req.body;
      const user = UserService.updateUser(req.params.id, dataToUpdate);
      res.send(user);
    } catch (err) {
      res.status(404).send({ error: true, message: err });
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
      res.send(user);
    } catch (err) {
      res.status(404).send({ error: true, message: err });
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
