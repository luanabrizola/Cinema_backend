import { GeneroDoFilmeController } from "./genero_do_filme.controller.js";

export async function generoDoFilmeRoutes(fastify) {

    const controller = new GeneroDoFilmeController();

    fastify.get('/genero-do-filme', controller.getAll.bind(controller));
    fastify.get('/genero-do-filme/filme/:id_filme', controller.getByFilme.bind(controller));
    fastify.get('/genero-do-filme/genero/:id_genero', controller.getByGenero.bind(controller));

    fastify.post('/genero-do-filme', controller.create.bind(controller));

    fastify.put('/genero-do-filme/:id_genero/:id_filme', controller.update.bind(controller));

    fastify.delete('/genero-do-filme/:id_genero/:id_filme', controller.delete.bind(controller));
}
