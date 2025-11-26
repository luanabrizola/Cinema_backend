import { DiretorController } from "./diretor.controller.js";

export async function diretorRoutes(fastify) {

    const controller = new DiretorController();

    fastify.get('/diretor', controller.getDiretores.bind(controller));
    fastify.get('/diretor/:id', controller.getDiretorById.bind(controller));
    fastify.post('/diretor', controller.createDiretor.bind(controller));
    fastify.put('/diretor/:id', controller.updateDiretor.bind(controller));
    fastify.delete('/diretor/:id', controller.deleteDiretor.bind(controller));
}
