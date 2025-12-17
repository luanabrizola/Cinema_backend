import { ItemProdutoService } from './item_produto.service.js';

export class ItemProdutoController {

    constructor() {
        this.itemProdutoService = new ItemProdutoService();
    }

    async getItens(request, reply) {
        const itens = await this.itemProdutoService.getAll();
        return reply.send(itens);
    }

    async getByProduto(request, reply) {
        const { id_produto } = request.params;
        try {
            const itens = await this.itemProdutoService.getByProduto(id_produto);
            return reply.send(itens);
        } catch (error) {
            return reply.code(404).send({ message: error.message });
        }
    }

    async getItemById(request, reply) {
        const { id } = request.params;

        try {
            const item = await this.itemProdutoService.getById(id);
            return reply.send(item);
        } catch (error) {
            return reply.code(404).send({ message: 'Item não encontrado' });
        }
    }

    async createItem(request, reply) {
        try {
            const novoItem = await this.itemProdutoService.create(request.body);

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
            const itemAtualizado = await this.itemProdutoService.update(id, request.body);
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
            await this.itemProdutoService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Item não encontrado'
            });
        }
    }
}
