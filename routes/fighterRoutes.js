const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

// GET /api/fighters
router.get(
  "/",
  (req, res, next) => {
    try {
      res.data = FighterService.getAllFighters();
    } catch (error) {
      res.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// GET /api/fighters/:id
router.get(
  "/:id",
  (req, res, next) => {
    try {
      res.data = FighterService.search({ id: req.params.id });
    } catch (error) {
      res.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// POST /api/fighters
router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      res.data = FighterService.createFighter(req.body);
    } catch (error) {
      res.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// PUT /api/fighters/:id
router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      const dataToUpdate = req.body;
      res.data = FighterService.updateFighter(req.params.id, dataToUpdate);
    } catch (error) {
      res.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// DELETE /api/fighters/:id
router.delete(
  "/:id",
  (req, res, next) => {
    try {
      res.data = FighterService.deleteFighter(req.params.id);
    } catch (error) {
      res.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
