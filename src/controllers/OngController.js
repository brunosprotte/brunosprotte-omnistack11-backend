const generateUniqueId = require('../utils/generateUniqueId');
const sendRegisterEmail = require('../utils/sendRegisterEmail');
const connection = require('../database/connection');
const OngSchemaModel = require('../schemaModels/OngSchemaModel');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const { error } = new OngSchemaModel(name, email, whatsapp, city, uf).validateSchema();

        if (error) {
            return response.status(422).json(error);
        }

        const id = generateUniqueId();

        try {
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
            });
        } catch (e) {
            return response.satus(400).json('Não conseguimos concluir seu cadastro, tente novamente!');
        }

        const mailError = sendRegisterEmail(id, email, name);
        if (mailError) {
            //TODO recuperar senha!
            return response.satus(400).json('Não conseguimos concluir seu cadastro, por favor entre em contato!');
        }

        return response.json({ id });
    }
};