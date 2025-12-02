import { ItemPedidoRepository } from "./item_pedido.repository.js";
import crypto from "crypto";

export class ItemPedidoService {
    constructor() {
        this.itemPedidoRepository = new ItemPedidoRepository();
    }

    async create(data) {
        const novoItem = {
            id_item_pedido: crypto.randomUUID(),
            nome_item_pedido: data.nome_item_pedido,
            categoria: data.categoria,
            quantidade: data.quantidade,
            preco_unitario: data.preco_unitario,
            id_pedido: data.id_pedido,
            is_ativo: true
        };

        return await this.itemPedidoRepository.create(novoItem);
    }

    async getAll() {
        return await this.itemPedidoRepository.findAll();
    }

    async getByPedido(idPedido) {
        const itens = await this.itemPedidoRepository.findByPedido(idPedido);
        if (!itens || itens.length === 0) throw new Error("Nenhum item encontrado para este pedido.");
        return itens;
    }

    async getById(idItem) {
        const item = await this.itemPedidoRepository.findById(idItem);
        if (!item) throw new Error("Item não encontrado.");
        return item;
    }

    async update(idItem, data) {
        const existente = await this.itemPedidoRepository.findById(idItem);
        if (!existente) throw new Error("Item não encontrado.");

        return await this.itemPedidoRepository.update(idItem, data);
    }

    async delete(idItem) {
        const existente = await this.itemPedidoRepository.findById(idItem);
        if (!existente) throw new Error("Item não encontrado.");

        return await this.itemPedidoRepository.deletar(idItem);
    }
}
