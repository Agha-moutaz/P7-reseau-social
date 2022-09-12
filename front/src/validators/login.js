import Joi from 'joi'

const name = Joi.string()
    .max(200)
    .required()

const email = Joi.string()
    .email({ tlds: {allow: false} })
    .max(100)
    .required()

const password = Joi.string()
    .regex(/^\w{6,12}$/)
    .required()

export const login = Joi.object({
    email,
    password,
    name
})