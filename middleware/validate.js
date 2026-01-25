const Validator = require('validatorjs');

const bookValidationRules = (req, res, next) => {
  const validationRule = {
    "title": "required|string",
    "author": "required|string",
    "genre": "required|string",
    "yearPublished": "required|integer",
    "isbn": "required|string",
    "pageCount": "required|integer",
    "language": "required|string"
  };

  const validation = new Validator(req.body, validationRule);
  if (validation.fails()) {
    res.status(400).send({
      success: false,
      message: 'Validation failed',
      data: validation.errors.all()
    });
  } else {
    next();
  }
};

const authorValidationRules = (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "birthDate": "required|string",
    "nationality": "required|string",
    "notableWork": "required|string",
    "awards": "required|string",
    "biography": "required|string"
  };

  const validation = new Validator(req.body, validationRule);
  if (validation.fails()) {
    res.status(400).send({
      success: false,
      message: 'Validation failed',
      data: validation.errors.all()
    });
  } else {
    next();
  }
};

module.exports = {
  bookValidationRules, 
  authorValidationRules
};