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
  "/:id",
  (req, res, next) => {
    try {
      const users = UserService.getAllUsers();
      res.send(users);
    } catch (err) {
      res.err = err;
      res.status(404).json({ error: true, message: "Users not found" });
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
      res.err = err;
      res.status(404).json({ error: true, message: "User not found" });
    } finally {
      next();
    }
  },
  responseMiddleware
);

// POST /api/users
router.post(
  "/",
  (req, res, next) => {
    try {
      const isUserValid = createUserValid(req.body);
      if (!isUserValid) {
        throw new Error();
      }

      const user = UserService.createUser(req.body);
      res.send(user);
      //initial implementation:save user in db
      //second iteration: validate body before save, if invalid -> throw error
    } catch (err) {
      res.err = err;
      res.status(400).json({ error: true, message: "User not found" });
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
      res.err = err;
      res.status(404).json({ error: true, message: "User not found" });
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
      res.err = err;
      res.status(404).json({ error: true, message: "User not found" });
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
