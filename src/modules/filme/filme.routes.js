import { FilmeController } from "./filme.controller.js";

export async function filmeRoutes(fastify) {

    const controller = new FilmeController();

    fastify.get('/filme', controller.getFilmes.bind(controller));
    fastify.get('/filme/:id', controller.getFilmeById.bind(controller));
    fastify.post('/filme', controller.createFilme.bind(controller));
    fastify.put('/filme/:id', controller.updateFilme.bind(controller));
    fastify.delete('/filme/:id', controller.deleteFilme.bind(controller));
}
