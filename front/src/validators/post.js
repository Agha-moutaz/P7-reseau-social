import Joi from 'joi'

const text = Joi.string()
    .min(5)
    .required()

export const postValidator = Joi.object({
    text
})