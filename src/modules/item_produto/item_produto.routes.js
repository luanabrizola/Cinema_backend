import { ItemProdutoController } from "./item_produto.controller.js";

export async function itemProdutoRoutes(fastify) {

    const controller = new ItemProdutoController();

    fastify.get('/item-produto', controller.getItens.bind(controller));
    fastify.get('/item-produto/:id', controller.getItemById.bind(controller));
    fastify.get('/item-produto/produto/:id_produto', controller.getByProduto.bind(controller));

    fastify.post('/item-produto', controller.createItem.bind(controller));
    fastify.put('/item-produto/:id', controller.updateItem.bind(controller));
    fastify.delete('/item-produto/:id', controller.deleteItem.bind(controller));
}
