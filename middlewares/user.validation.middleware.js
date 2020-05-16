const { user } = require("../models/user");
var isEmpty = require("lodash.isempty");

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation

  const userData = req.body;
  const { id, ...userParams } = user;

  const missingParams = Object.keys(userParams)
    .filter((key) => !userData[key])
    .map((param) => `${param} is required`)
    .join(", ");

  const extraKeys = Object.keys(userData)
    .filter((key) => !Object.keys(userParams).includes(key))
    .map((param) => `${param} is extra`)
    .join(", ");

  if (!isEmpty(missingParams)) {
    const error = new Error(missingParams);
    error.statusCode = 400;
    return next(error);
  }

  if (!isEmpty(extraKeys)) {
    const error = new Error(extraKeys);
    error.statusCode = 400;
    return next(error);
  }

  const regexEmail = /^[\w.+\-]+@gmail\.com$/gm;
  if (!regexEmail.test(req.body.email)) {
    const error = new Error(`Email ${req.body.email} does not fit`);
    error.statusCode = 400;
    return next(error);
  }

  const regexPhone = /^\+380(\d{9})$/g;
  if (!regexPhone.test(req.body.phoneNumber)) {
    const error = new Error(`Phone ${req.body.phoneNumber} does not fit`);
    error.statusCode = 400;
    return next(error);
  }

  const regexDefense = /^([1-9]|10)$/g;
  if (!regexDefense.test(req.body.defense)) {
    const error = new Error(`Defense ${req.body.defense} does not fit`);
    error.statusCode = 400;
    return next(error);
  }

  const regexPassword = /^(.{0,3})$/g;
  if (regexPassword.test(req.body.password)) {
    const error = new Error(
      `Password ${req.body.password} must be more than 3 characters`
    );
    error.statusCode = 400;
    return next(error);
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const { email, phoneNumber, defense, password } = req.body;

  const userData = req.body;
  const { id, ...userParams } = user;

  const extraKeys = Object.keys(userData)
    .filter((key) => !Object.keys(userParams).includes(key))
    .map((param) => `${param} is extra`)
    .join(", ");

  if (!isEmpty(extraKeys)) {
    const error = new Error(extraKeys);
    error.statusCode = 400;
    return next(error);
  }

  const regexEmail = /^[\w.+\-]+@gmail\.com$/gm;
  if (email && !regexEmail.test(email)) {
    const error = new Error(`Email ${email} does not fit`);
    error.statusCode = 400;
    return next(error);
  }

  const regexPhone = /^\+380(\d{9})$/g;
  if (phoneNumber && !regexPhone.test(phoneNumber)) {
    const error = new Error(`Phone ${phoneNumber} does not fit`);
    error.statusCode = 400;
    return next(error);
  }

  const regexDefense = /^([1-9]|10)$/g;
  if (defense && !regexDefense.test(defense)) {
    const error = new Error(`Defense ${defense} does not fit`);
    error.statusCode = 400;
    return next(error);
  }

  const regexPassword = /^(.{0,3})$/g;
  if (password && regexPassword.test(password)) {
    const error = new Error(
      `Password ${password} must be more than 3 characters`
    );
    error.statusCode = 400;
    return next(error);
  }

  next();
};

module.exports = { createUserValid, updateUserValid };
