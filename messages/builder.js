/**
 * Custom message builder
 */
const messageBuilder = (opts) => {
  const {
    field,
    field2,
    min,
    max,
    length,
    greater
  } = opts;

  const message = {
    'boolean.base': `${field} must be boolean`,
    'string.base': `${field} must be a string`,
    'string.empty': `${field} must not be empty`,
    'string.min': `${field} length must be atlest ${min}`,
    'string.max': `${field} length must not be over ${max}`,
    'string.length': `${field} length must be ${length} characters long `,
    'string.email': `Email is invalid`,
    'any.empty': `${field} is required`,
    'any.required': `${field} is required`,
    'any.custom': `${field} not a valid ID`,
    'object.base': `${field} must be an object`,
    'object.unknown': `Field not allowed`,
    'array.base': `${field} must be a list`,
    'array.unique': `${field} must be unique`,
    'array.includesRequiredUnknowns': `${field} are required`,
    'number.positive': `${field} must be a positive value`,
    'number.base': `${field} must be a number`,
    'number.greater': `${field} must be greater than ${greater}`,
    'number.min': `${field} must be greater than or equal to ${field2}`,
    'date.base': `${field} must be a valid date`
  };

  return message;
};

module.exports = messageBuilder;
