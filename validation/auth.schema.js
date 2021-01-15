const Joi = require('@hapi/joi');
const builder = require('../messages/builder');

const registerSchema = Joi.object ()
.keys({
    fullName: Joi.string()
        .max(100)    
        .required()
        .messages(builder({ field: "Fullname", max: 100})),
    email: Joi.string()
        .required()
        .email()
        .messages(builder({ field: "Email" })),
    password: Joi.string()
        .min(8)
        .required()
        .messages(builder({ field: "Password", min: 8}))
});


const loginSchema = Joi.object ({
    email: Joi.string()
        .required()
        .email()
        .messages(builder({ field: "Email" })),
    password: Joi.string()
        .min(8)
        .required()
        .messages(builder({ field: "Password", min: 8}))
});

module.exports = {
    registerSchema,
    loginSchema
}