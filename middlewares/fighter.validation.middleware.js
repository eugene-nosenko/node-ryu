const { fighter } = require("../models/fighter");
var isEmpty = require("lodash.isempty");

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  const dataFighter = req.body;

  const { id, ...fighterKeys } = fighter;
  console.log(fighterKeys);

  const missingKeys = Object.keys(fighterKeys)
    .filter((key) => !dataFighter[key])
    .map((prop) => `${prop} is required`)
    .join(", ");

  if (!isEmpty(missingKeys)) {
    const error = new Error(missingKeys);
    error.statusCode = 400;
    return next(error);
  }

  const extraKeys = Object.keys(dataFighter)
    .filter((key) => !Object.keys(fighterKeys).includes(key))
    .map((prop) => `${prop} is extra`)
    .join(", ");

  if (!isEmpty(extraKeys)) {
    const error = new Error(extraKeys);
    error.statusCode = 400;
    return next(error);
  }

  if (typeof dataFighter.power !== "number" || dataFighter.power > 100) {
    const error = new Error(`Power ${dataFighter.power} must be from 1 to 100`);
    error.statusCode = 400;
    return next(error);
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update

  const dataFighter = req.body;

  const { id, ...fighterKeys } = fighter;

  const extraKeys = Object.keys(dataFighter)
    .filter((key) => !Object.keys(fighterKeys).includes(key))
    .map((prop) => `${prop} is extra`)
    .join(", ");

  if (!isEmpty(extraKeys)) {
    const error = new Error(extraKeys);
    error.statusCode = 400;
    return next(error);
  }

  if (typeof dataFighter.power !== "number" || dataFighter.power > 100) {
    const error = new Error(`Power ${dataFighter.power} must be from 1 to 100`);
    error.statusCode = 400;
    return next(error);
  }

  next();
};

module.exports = { createFighterValid, updateFighterValid };
