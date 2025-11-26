import { AtorController } from "./ator.controller.js";

export async function atorRoutes(fastify) {

    const controller = new AtorController();

    fastify.get('/ator', controller.getAtores.bind(controller));
    fastify.get('/ator/:id', controller.getAtorById.bind(controller));
    fastify.post('/ator', controller.createAtor.bind(controller));
    fastify.put('/ator/:id', controller.updateAtor.bind(controller));
    fastify.delete('/ator/:id', controller.deleteAtor.bind(controller));
}
