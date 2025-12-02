import { ItemPedidoService } from './item_pedido.service.js';

export class ItemPedidoController {

    constructor() {
        this.itemPedidoService = new ItemPedidoService();
    }

    async getItens(request, reply) {
        const itens = await this.itemPedidoService.getAll();
        return reply.send(itens);
    }

    async getByPedido(request, reply) {
        const { id_pedido } = request.params;
        try {
            const itens = await this.itemPedidoService.getByPedido(id_pedido);
            return reply.send(itens);
        } catch (error) {
            return reply.code(404).send({ message: error.message });
        }
    }

    async getItemById(request, reply) {
        const { id } = request.params;

        try {
            const item = await this.itemPedidoService.getById(id);
            return reply.send(item);
        } catch (error) {
            return reply.code(404).send({ message: 'Item não encontrado' });
        }
    }

    async createItem(request, reply) {
        try {
            const novoItem = await this.itemPedidoService.create(request.body);

            return reply.code(201).send({
                message: 'Item criado com sucesso!',
                item: novoItem
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar item.'
            });
        }
    }

    async updateItem(request, reply) {
        const { id } = request.params;

        try {
            const itemAtualizado = await this.itemPedidoService.update(id, request.body);
            return reply.send(itemAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Item não encontrado'
            });
        }
    }

    async deleteItem(request, reply) {
        const { id } = request.params;

        try {
            await this.itemPedidoService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Item não encontrado'
            });
        }
    }
}
