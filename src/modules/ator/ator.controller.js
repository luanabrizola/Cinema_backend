import { AtorService } from './ator.service.js';

export class AtorController {

    constructor() {
        this.atorService = new AtorService();
    }

    async getAtores(request, reply) {
        const atores = await this.atorService.getAll();
        return reply.send(atores);
    }

    async getAtorById(request, reply) {
        const { id } = request.params;

        try {
            const ator = await this.atorService.getById(id);
            return reply.send(ator);
        } catch (error) {
            return reply.code(404).send({ message: 'Ator não encontrado' });
        }
    }

    async createAtor(request, reply) {
        try {
            const novoAtor = await this.atorService.create(request.body);

            return reply.code(201).send({
                message: 'Ator criado com sucesso!',
                ator: novoAtor
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar ator.'
            });
        }
    }

    async updateAtor(request, reply) {
        const { id } = request.params;

        try {
            const atorAtualizado = await this.atorService.update(id, request.body);
            return reply.send(atorAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Ator não encontrado'
            });
        }
    }

    async deleteAtor(request, reply) {
        const { id } = request.params;

        try {
            await this.atorService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Ator não encontrado'
            });
        }
    }
}
