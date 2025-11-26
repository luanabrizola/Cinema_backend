import { GeneroController } from "./genero.controller.js";

export async function generoRoutes(fastify) {

    const controller = new GeneroController();

    fastify.get('/genero', controller.getGeneros.bind(controller));
    fastify.get('/genero/:id', controller.getDGeneroById.bind(controller));
    fastify.post('/genero', controller.createGenero.bind(controller));
    fastify.put('/genero/:id', controller.updateGenero.bind(controller));
    fastify.delete('/genero/:id', controller.deleteGenero.bind(controller));
}
