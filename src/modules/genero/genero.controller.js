import {GeneroService} from './genero.service.js'

export class GeneroController {

    constructor() {
        this.generoService = new GeneroService();
    }

    async getGeneros(request, reply) {
        const generos = await this.generoService.getAll();
        return reply.send(generos);
    }

    async getDGeneroById(request, reply) {
        const { id } = request.params;

        try {
            const genero = await this.generoService.getById(id);
            return reply.send(genero);
        } catch (error) {
            return reply.code(404).send({ message: 'Genero não encontrado' });
        }
    }

    async createGenero(request, reply) {
        try {
            const novoGenero = await this.generoService.create(request.body);

            return reply.code(201).send({
                message: 'Genero criado com sucesso!',
                genero: novoGenero
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar genero.'
            });
        }
    }

    async updateGenero(request, reply) {
        const { id } = request.params;

        try {
            const generoAtualizado = await this.generoService.update(id, request.body);
            return reply.send(generoAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Genero não encontrado'
            });
        }
    }

    async deleteGenero(request, reply) {
        const { id } = request.params;

        try {
            await this.generoService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Genero não encontrado'
            });
        }
    }
}
