const connection = require('../database/connection');
const { Joi } = require('celebrate');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const { error } = Joi.object().keys({
            id: Joi.string().required(),
        }).validate({ id });

        if (error) {
            return response.status(422).json(error);
        }

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong);
    },
}