const Joi = require("joi");

const PostSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  img: Joi.string().uri().optional(),
  comment: Joi.array().items(Joi.string()).optional(),
});

module.exports = PostSchema;
