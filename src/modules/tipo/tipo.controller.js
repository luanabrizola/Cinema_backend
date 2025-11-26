import {TipoService} from './tipo.service.js'

export class TipoController {

    constructor() {
        this.tipoService = new TipoService();
    }

    async getTipos(request, reply) {
        const tipo = await this.tipoService.getAll();
        return reply.send(tipo);
    }

    async getTipoById(request, reply) {
        const { id } = request.params;

        try {
            const tipo = await this.tipoService.getById(id);
            return reply.send(tipo);
        } catch (error) {
            return reply.code(404).send({ message: 'Tipo não encontrado' });
        }
    }

    async createTipo(request, reply) {
        try {
            const novoTipo = await this.tipoService.create(request.body);

            return reply.code(201).send({
                message: 'Tipo criado com sucesso!',
                tipo: novoTipo
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar tipo.'
            });
        }
    }

    async updateTipo(request, reply) {
        const { id } = request.params;

        try {
            const tipoAtualizado = await this.tipoService.update(id, request.body);
            return reply.send(tipoAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Tipo não encontrado'
            });
        }
    }

    async deleteTipo(request, reply) {
        const { id } = request.params;

        try {
            await this.tipoService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Tipo não encontrado'
            });
        }
    }
}
