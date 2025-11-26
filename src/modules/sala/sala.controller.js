import { SalaService } from './sala.service.js';

export class SalaController {

    constructor() {
        this.salaService = new SalaService();
    }

    async getSalas(request, reply) {
        const sala = await this.salaService.getAll();
        return reply.send(sala);
    }

    async getSalaById(request, reply) {
        const { id } = request.params;

        try {
            const sala = await this.salaService.getById(id);
            return reply.send(sala);
        } catch (error) {
            return reply.code(404).send({ message: 'Sala não encontrada' });
        }
    }

    async createSala(request, reply) {
        try {
            const novoSala = await this.salaService.create(request.body);

            return reply.code(201).send({
                message: 'Sala criada com sucesso!',
                sala: novoSala
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar sala.'
            });
        }
    }

    async updateSala(request, reply) {
        const { id } = request.params;

        try {
            const salaAtualizado = await this.salaService.update(id, request.body);
            return reply.send(salaAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Sala não encontrada'
            });
        }
    }

    async deleteSala(request, reply) {
        const { id } = request.params;

        try {
            await this.salaService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Sala não encontrada'
            });
        }
    }
}
