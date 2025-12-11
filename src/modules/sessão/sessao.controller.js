import { SessaoService } from './sessao.service.js';

export class SessaoController {
    constructor() {
        this.sessaoService = new SessaoService();
    }

    async createSessao(request, reply) {
        try {
            const nova = await this.sessaoService.create(request.body);
            reply.status(201).send(nova);
        } catch (err) {
            reply.status(400).send({ error: err.message });
        }
    }

    async getSessoes(request, reply) {
        const sessoes = await this.sessaoService.getAll();
        reply.send(sessoes);
    }

    async getSessaoById(request, reply) {
        try {
            const sessao = await this.sessaoService.getById(request.params.id);
            reply.send(sessao);
        } catch (err) {
            reply.status(404).send({ error: err.message });
        }
    }

    async getSessoesPorFilme(request, reply) {
        const sessoes = await this.sessaoService.getByFilme(request.params.id_filme);
        reply.send(sessoes);
    }

    async updateSessao(request, reply) {
        try {
            const atualizado = await this.sessaoService.update(request.params.id, request.body);
            reply.send(atualizado);
        } catch (err) {
            reply.status(404).send({ error: err.message });
        }
    }

    async deleteSessao(request, reply) {
        try {
            await this.sessaoService.delete(request.params.id);
            reply.status(204).send();
        } catch (err) {
            reply.status(404).send({ error: err.message });
        }
    }
}
