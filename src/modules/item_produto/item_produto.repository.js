import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { item_produto } from '../../infra/db/schema.js';

export class ItemProdutoitem_produtoRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(item_produto)
            .values({
                id_item_produto: data.id_item_produto,
                id_ingresso: data.id_ingresso,
                id_produto: data.id_produto,
                quantidade: data.quantidade,
                preco_unitario: data.preco_unitario,
                is_ativo: true
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(item_produto);
    }

    async findByItem_produto(idItem_produto) {
        return await this.db
            .select()
            .from(item_produto)
            .where(eq(item_produto.id_item_produto, idItem_produto));
    }

    async findById(idItem) {
        return await this.db
            .select()
            .from(item_produto)
            .where(eq(item_produto.id_item_produto, idItem));
    }

    async update(idItem, data) {
        const result = await this.db
            .update(item_produto)
            .set({
                ...data,
                preco_subtotal: data.quantidade * data.preco_unitario
            })
            .where(eq(item_produto.id_item_produto, idItem))
            .returning();

        return result[0];
    }

    async deletar(idItem) {
        const result = await this.db
            .update(item_produto)
            .set({ is_ativo: false })
            .where(eq(item_produto.id_item_produto, idItem))
            .returning();

        return result[0];
    }
}
