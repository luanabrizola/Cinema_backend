import {TipoController } from "./tipo.controller.js";

export async function tipoRoutes(fastify) {

    const controller = new TipoController();

    fastify.get('/tipo', controller.getTipos.bind(controller));
    fastify.get('/tipo/:id', controller.getTipoById.bind(controller));
    fastify.post('/tipo', controller.createTipo.bind(controller));
    fastify.put('/tipo/:id', controller.updateTipo.bind(controller));
    fastify.delete('/tipo/:id', controller.deleteTipo.bind(controller));
}
