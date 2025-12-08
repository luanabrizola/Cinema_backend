import { SessaoService } from './sessao.service.js';

export class SessaoController {
    constructor() {
        this.sessaoService = new SessaoService();
    }

    async getSessoes(request, reply) {
        const sessoes = await this.sessaoService.getAll();
        return reply.send(sessoes);
    }

    async getSessaoById(request, reply) {
        const { id } = request.params;
        try {
            const sessao = await this.sessaoService.getById(id);
            return reply.send(sessao);
        } catch (error) {
            return reply.code(404).send({ message: error.message });
        }
    }

    async createSessao(request, reply) {
        try {
            const novaSessao = await this.sessaoService.create(request.body);
            return reply.code(201).send({
                message: 'Sessão criada com sucesso!',
                sessao: novaSessao
            });
        } catch (error) {
            return reply.code(400).send({ error: error.message });
        }
    }

    async updateSessao(request, reply) {
        const { id } = request.params;
        try {
            const atualizado = await this.sessaoService.update(id, request.body);
            return reply.send({ message: 'Sessão atualizada', sessao: atualizado });
        } catch (error) {
            return reply.code(404).send({ message: error.message });
        }
    }

    async deleteSessao(request, reply) {
        const { id } = request.params;
        try {
            await this.sessaoService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({ message: error.message });
        }
    }
}
