import { SessaoController } from './sessao.controller.js';

export async function sessaoRoutes(fastify) {
    const controller = new SessaoController();

    fastify.get('/sessao', controller.getSessoes.bind(controller));
    fastify.get('/sessao/:id', controller.getSessaoById.bind(controller));
    fastify.get('/sessao/filme/:id_filme', controller.getSessoesPorFilme.bind(controller));
    fastify.post('/sessao', controller.createSessao.bind(controller));
    fastify.put('/sessao/:id', controller.updateSessao.bind(controller));
    fastify.delete('/sessao/:id', controller.deleteSessao.bind(controller));
}
