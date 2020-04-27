const connection = require('../database/connection');

const IncidentSchemaModel = require('../schemaModels/IncidentSchemaModel');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const inicidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        response.json(inicidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const { error } = new IncidentSchemaModel(title, description, value).validateCreateSchema();

        if (error) {
            return response.status(422).json(error);
        }

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const { error } = new IncidentSchemaModel().validateDeletion({ id, ong_id });

        if (error) {
            return response.status(422).json(error);
        }

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident || incident.ong_id !== ong_id) {
            response.status(401).json({ error: 'Operation not permited.' });
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};