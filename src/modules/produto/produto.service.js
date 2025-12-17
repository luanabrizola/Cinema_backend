import { PedidoRepository } from "./pedido.repository.js"
import crypto from "crypto"

export class PedidoService {
    constructor() {
        this.pedidoRepository = new PedidoRepository()
    }

    async create(data) {
        const novoPedido = {
            id_pedido: crypto.randomUUID(),
            preco_total: data.preco_total,
            forma_pagamento: data.forma_pagamento,
            is_ativo: true
        }

        return await this.pedidoRepository.create(novoPedido)
    }
    
    async getAll() {
        return await this.pedidoRepository.findAll()
    }

    async getById(id) {
        const pedido = await this.pedidoRepository.findById(id)
        if (!pedido) throw new Error("Pedido não encontrado.")
        return pedido
    }

    async update(id, data) {
        const existente = await this.pedidoRepository.findById(id)
        if (!existente) throw new Error("Pedido não encontrado.")

        return await this.pedidoRepository.update(id, data)
    }

    async delete(id) {
        const existente = await this.pedidoRepository.findById(id)
        if (!existente) throw new Error("Pedido não encontrado.")

        return await this.pedidoRepository.deletar(id)
    }
}
