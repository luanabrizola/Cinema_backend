import { AssentoController } from "./assento.controller.js";

export async function assentoRoutes(fastify) {

    const controller = new AssentoController();

    fastify.get('/assento', controller.getAssentos.bind(controller));
    fastify.get('/assento/:id', controller.getAssentoById.bind(controller));
    fastify.post('/assento', controller.createAssento.bind(controller));
    fastify.put('/assento/:id', controller.updateAssento.bind(controller));
    fastify.delete('/assento/:id', controller.deleteAssento.bind(controller));
}
