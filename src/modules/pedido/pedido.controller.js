import { PedidoService } from './pedido.service.js';

export class PedidoController {

    constructor() {
        this.pedidoService = new PedidoService();
    }

    async getPedidos(request, reply) {
        const pedido = await this.pedidoService.getAll();
        return reply.send(pedido);
    }

    async getPedidoById(request, reply) {
        const { id } = request.params;

        try {
            const pedido = await this.pedidoService.getById(id);
            return reply.send(pedido);
        } catch (error) {
            return reply.code(404).send({ message: 'Pedido não encontrado' });
        }
    }

    async createPedido(request, reply) {
        try {
            const novopedido = await this.pedidoService.create(request.body);

            return reply.code(201).send({
                message: 'Pedido criada com sucesso!',
                pedido: novopedido
            });

        } catch (error) {
            return reply.code(400).send({
                error: error.message || 'Erro ao criar pedido.'
            });
        }
    }

    async updatePedido(request, reply) {
        const { id } = request.params;

        try {
            const pedidoAtualizado = await this.pedidoService.update(id, request.body);
            return reply.send(pedidoAtualizado);
        } catch (error) {
            return reply.code(404).send({
                message: 'Pedido não encontrado'
            });
        }
    }

    async deletePedido(request, reply) {
        const { id } = request.params;

        try {
            await this.pedidoService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({
                message: 'Pedido não encontrado'
            });
        }
    }
}
