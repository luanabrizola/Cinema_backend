import { DiretorDoFilmeController } from "./diretor_do_filme.controller.js";

export async function diretorDoFilmeRoutes(fastify) {

    const controller = new DiretorDoFilmeController();

    fastify.get('/diretor-do-filme', controller.getAll.bind(controller));
    fastify.get('/diretor-do-filme/filme/:id_filme', controller.getByFilme.bind(controller));
    fastify.get('/diretor-do-filme/diretor/:id_diretor', controller.getByDiretor.bind(controller));

    fastify.post('/diretor-do-filme', controller.create.bind(controller));

    fastify.put('/diretor-do-filme/:id_diretor/:id_filme', controller.update.bind(controller));

    fastify.delete('/diretor-do-filme/:id_diretor/:id_filme', controller.delete.bind(controller));
}
