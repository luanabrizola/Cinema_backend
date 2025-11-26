import { PedidoController } from "./pedido.controller.js";

export async function pedidoRoutes(fastify) {

    const controller = new PedidoController();

    fastify.get('/pedido', controller.getPedidos.bind(controller));
    fastify.get('/pedido/:id', controller.getPedidoById.bind(controller));
    fastify.post('/pedido', controller.createPedido.bind(controller));
    fastify.put('/pedido/:id', controller.updatePedido.bind(controller));
    fastify.delete('/pedido/:id', controller.deletePedido.bind(controller));
}
