import { ItemPedidoController } from "./item_pedido.controller.js";

export async function itemPedidoRoutes(fastify) {

    const controller = new ItemPedidoController();

    fastify.get('/item-pedido', controller.getItens.bind(controller));
    fastify.get('/item-pedido/:id', controller.getItemById.bind(controller));
    fastify.get('/item-pedido/pedido/:id_pedido', controller.getByPedido.bind(controller));

    fastify.post('/item-pedido', controller.createItem.bind(controller));
    fastify.put('/item-pedido/:id', controller.updateItem.bind(controller));
    fastify.delete('/item-pedido/:id', controller.deleteItem.bind(controller));
}
