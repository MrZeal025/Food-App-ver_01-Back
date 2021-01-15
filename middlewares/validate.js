/**
 * Validation Module
 * @param { req.body} req 
 * @return { Array } 
 * @condition { true } proceed to controller
 */

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json(error.details)
    next();
  };
};
