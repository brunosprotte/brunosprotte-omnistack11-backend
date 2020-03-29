const { Joi } = require('celebrate');

class IncidentSchemaModel {

    constructor(title = '', description = '', value = '') {
        this.title = title;
        this.description = description;
        this.value = value;
        return this;
    }

    getModel() {
        return {
            title: this.title,
            description: this.description,
            value: this.value
        }
    }

    createSchema() {
        return Joi
            .object()
            .options({ abortEarly: false })
            .keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                value: Joi.number().required(),
            });
    }

    deletionSchema() {
        return Joi
            .object()
            .options({ abortEarly: false })
            .keys({
                id: Joi.string().required(),
                ong_id: Joi.string().required(),
            });
    }

    validateCreateSchema() {
        return this.createSchema().validate(this.getModel());
    }

    validateDeletion(deletionIds) {
        return this.deletionSchema().validate(deletionIds);
    }
}

module.exports = IncidentSchemaModel;