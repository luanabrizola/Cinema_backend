import { AtorDoFilmeController } from "./ator_do_filme.controller.js";

export async function atorDoFilmeRoutes(fastify) {

    const controller = new AtorDoFilmeController();

    fastify.get('/ator-do-filme', controller.getAll.bind(controller));
    fastify.get('/ator-do-filme/filme/:id_filme', controller.getByFilme.bind(controller));
    fastify.get('/ator-do-filme/ator/:id_ator', controller.getByAtor.bind(controller));

    fastify.post('/ator-do-filme', controller.create.bind(controller));

    fastify.put('/ator-do-filme/:id_ator/:id_filme', controller.update.bind(controller));

    fastify.delete('/ator-do-filme/:id_ator/:id_filme', controller.delete.bind(controller));
}
