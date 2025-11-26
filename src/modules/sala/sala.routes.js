import { SalaController } from "./sala.controller.js";

export async function salaRoutes(fastify) {

    const controller = new SalaController();

    fastify.get('/sala', controller.getSalas.bind(controller));
    fastify.get('/sala/:id', controller.getSalaById.bind(controller));
    fastify.post('/sala', controller.createSala.bind(controller));
    fastify.put('/sala/:id', controller.updateSala.bind(controller));
    fastify.delete('/sala/:id', controller.deleteSala.bind(controller));
}
