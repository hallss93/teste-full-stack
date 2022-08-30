const Joi = require("joi");
const validate = (body, schema) => {
  const { error } = Joi.validate(body, schema);
  const valid = error == null;

  if (valid) {
    return true;
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    return { error: message };
  }
};

exports.getUser = (req, res, next) => {
  const schema = {
    id: Joi.string().required(),
  };
  const valid = validate(req.params, schema);

  if (valid === true) {
    next();
  } else {
    res.status(422).json(valid);
  }
};

exports.deleteUser = (req, res, next) => {
  const schema = {
    id: Joi.string().required(),
  };
  const valid = validate(req.params, schema);

  if (valid === true) {
    next();
  } else {
    res.status(422).json(valid);
  }
};

exports.create = (req, res, next) => {
  const schema = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().required().length(14),
  };
  const valid = validate(req.body, schema);

  if (valid === true) {
    next();
  } else {
    res.status(422).json(valid);
  }
};

exports.update = (req, res, next) => {
  const schema = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().required().length(14),
  };
  const valid = validate(req.body, schema);

  if (valid === true) {
    next();
  } else {
    res.status(422).json(valid);
  }
};
