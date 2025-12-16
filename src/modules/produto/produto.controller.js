import { ProdutoService } from './produto.service.js';

export class ProdutoController {

    constructor() {
        this.produtoService = new ProdutoService();
    }

    async getProdutos(request, reply) {
        const produto = await this.produtoService.getAll();
        return reply.send(produto);
    }

    async getProdutoById(request, reply) {
        const { id } = request.params;

        try {
            const produto = await this.produtoService.getById(id);
            return reply.send(produto);
        } catch (error) {
            return reply.code(404).send({ message: 'Produto não encontrado' });
        }
    }

    async createProduto(request, reply) {
        try {
            const novoproduto = await this.produtoService.create(request.body);

            return reply.code(201).send({
                message: 'Produto criada com sucesso!',
                produto: novoproduto
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar produto.'
            });
        }
    }

    async updateProduto(request, reply) {
        const { id } = request.params;

        try {
            const produtoAtualizado = await this.produtoService.update(id, request.body);
            return reply.send(produtoAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Produto não encontrado'
            });
        }
    }

    async deleteProduto(request, reply) {
        const { id } = request.params;

        try {
            await this.produtoService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Produto não encontrado'
            });
        }
    }
}
