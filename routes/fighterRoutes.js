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
  "/:id",
  (req, res, next) => {
    try {
      const fighters = FighterService.getAllFighters();
      res.send(fighters);
    } catch (err) {
      res.status(404).send({ error: true, message: err });
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
      const fighter = FighterService.search({ id: req.params.id });
      res.send(fighter);
    } catch (err) {
      res.status(404).send({ error: true, message: err });
    } finally {
      next();
    }
  },
  responseMiddleware
);

// POST /api/fighters
router.post(
  "/",
  (req, res, next) => {
    try {
      console.log(req.body);
      const isFighterValid = createFighterValid(req.body);
      if (!isFighterValid) {
        throw new Error();
      }
      console.log(req.body);
      const fighter = FighterService.createFighter(req.body);
      res.send(fighter);
    } catch (err) {
      res.status(400).send({ error: true, message: err });
    } finally {
      next();
    }
  },
  responseMiddleware
);

// PUT /api/fighters/:id
router.put(
  "/:id",
  (req, res, next) => {
    try {
      const dataToUpdate = req.body;
      const fighter = FighterService.updateFighter(req.params.id, dataToUpdate);
      res.send(fighter);
    } catch (err) {
      res.status(404).send({ error: true, message: err });
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
      const fighter = FighterService.deleteFighter(req.params.id);
      res.send(fighter);
    } catch (err) {
      res.status(404).send({ error: true, message: err });
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
