import { FilmeService } from './filme.service.js';
export class FilmeController {

    constructor() {
        this.filmeService = new FilmeService();
    }

    async getFilmes(request, reply) {
        const filme = await this.filmeService.getAll();
        return reply.send(filme);
    }

    async getFilmeById(request, reply) {
        const { id } = request.params;

        try {
            const filme = await this.filmeService.getById(id);
            return reply.send(filme);
        } catch (error) {
            return reply.code(404).send({ message: 'Filme não encontrado' });
        }
    }

    async createFilme(request, reply) {
        try {
            const novofilme = await this.filmeService.create(request.body);

            return reply.code(201).send({
                message: 'Filme criada com sucesso!',
                filme: novofilme
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar filme.'
            });
        }
    }

    async updateFilme(request, reply) {
        const { id } = request.params;

        try {
            const filmeAtualizado = await this.filmeService.update(id, request.body);
            return reply.send(filmeAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Filme não encontrado'
            });
        }
    }

    async deleteFilme(request, reply) {
        const { id } = request.params;

        try {
            await this.filmeService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Filme não encontrado'
            });
        }
    }
}
