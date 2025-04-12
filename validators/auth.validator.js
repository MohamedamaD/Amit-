const Joi = require("joi");


// validate user input  

// {
//      username: "mohamed",
//      email: "mohamed@gmail.com",
//      password: "mohamed#12"
// }

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  //   role: Joi.string().valid('admin', 'user').default("user").optional(),
});

module.exports = { registerSchema };
