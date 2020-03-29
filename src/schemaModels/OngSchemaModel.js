const { Joi } = require('celebrate');

class OngSchemaModel {

    constructor(name = '', email = '', whatsapp = '', city = '', uf = '') {
        this.name = name;
        this.email = email;
        this.whatsapp = whatsapp;
        this.city = city;
        this.uf = uf;

        return this;
    }

    getModel() {
        return {
            name: this.name,
            email: this.email,
            whatsapp: this.whatsapp,
            city: this.city,
            uf: this.uf,
        }
    }

    schema() {
        return Joi
            .object()
            .options({ abortEarly: false })
            .keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required().min(13).max(16),
                city: Joi.string().required(),
                uf: Joi.string().required().length(2),
            })
    }

    validateSchema() {
        return this.schema().validate(this.getModel());
    }
}

module.exports = OngSchemaModel;