const Joi = require('joi');

module.exports = {
    validateGenre: genre => {
        const schema = {
            name: Joi.string().required().min(5).max(50).label('Name')
        };

        return Joi.validate(genre, schema);
    },

    validateCustomer: customer => {
        const schema = {
            name: Joi.string().required().min(5).max(50).label('Name'),
            phone: Joi.string().required().min(5).max(50).label('Phone'),
            isGold: Joi.boolean()
        };

        return Joi.validate(customer, schema);
    },

    validateUser: user => {
        const schema = {
            name: Joi.string().required().min(5).max(50).label('Name'),
            email: Joi.string().required().email().min(5).max(255).trim().label('Email'),
            password: Joi.string().required().min(5).max(1024).label('Password'),
            confirm: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }).label('Confirm')
        };

        return Joi.validate(user, schema);
    },

    validate: auth => {
        const schema = {
            email: Joi.string().required().email().min(5).max(255).trim().label('Email'),
            password: Joi.string().required().min(5).max(1024).label('Password')
        };

        return Joi.validate(auth, schema);
    }
}