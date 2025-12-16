import { ItemProdutoRepository } from "./item_produto.repository.js";
import crypto from "crypto";

export class ItemProdutoService {
    constructor() {
        this.itemProdutoRepository = new ItemProdutoRepository();
    }

    async create(data) {
        const novoItem = {
            id_item_produto: crypto.randomUUID(),
            id_ingresso: data.id_ingresso,
            id_produto: data.id_produto,
            quantidade: data.quantidade,
            preco_unitario: data.preco_unitario,
            is_ativo: true
        };

        return await this.itemProdutoRepository.create(novoItem);
    }

    async getAll() {
        return await this.itemProdutoRepository.findAll();
    }

    async getByProduto(idProduto) {
        const itens = await this.itemProdutoRepository.findByProduto(idProduto);
        if (!itens || itens.length === 0) throw new Error("Nenhum item encontrado para este produto.");
        return itens;
    }

    async getById(idItem) {
        const item = await this.itemProdutoRepository.findById(idItem);
        if (!item) throw new Error("Item não encontrado.");
        return item;
    }

    async update(idItem, data) {
        const existente = await this.itemProdutoRepository.findById(idItem);
        if (!existente) throw new Error("Item não encontrado.");

        return await this.itemProdutoRepository.update(idItem, data);
    }

    async delete(idItem) {
        const existente = await this.itemProdutoRepository.findById(idItem);
        if (!existente) throw new Error("Item não encontrado.");

        return await this.itemProdutoRepository.deletar(idItem);
    }
}
