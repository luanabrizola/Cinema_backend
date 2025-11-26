import { DiretorService } from './diretor.service.js';

export class DiretorController {

    constructor() {
        this.diretorService = new DiretorService();
    }

    async getDiretores(request, reply) {
        const diretores = await this.diretorService.getAll();
        return reply.send(diretores);
    }

    async getDiretorById(request, reply) {
        const { id } = request.params;

        try {
            const diretor = await this.diretorService.getById(id);
            return reply.send(diretor);
        } catch (error) {
            return reply.code(404).send({ message: 'Diretor não encontrado' });
        }
    }

    async createDiretor(request, reply) {
        try {
            const novoDiretor = await this.diretorService.create(request.body);

            return reply.code(201).send({
                message: 'Diretor criado com sucesso!',
                diretor: novoDiretor
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar diretor.'
            });
        }
    }

    async updateDiretor(request, reply) {
        const { id } = request.params;

        try {
            const diretorAtualizado = await this.diretorService.update(id, request.body);
            return reply.send(diretorAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Diretor não encontrado'
            });
        }
    }

    async deleteDiretor(request, reply) {
        const { id } = request.params;

        try {
            await this.diretorService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Diretor não encontrado'
            });
        }
    }
}
