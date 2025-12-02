import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { item_pedido } from '../../infra/db/schema.js';

export class ItemPedidoRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(item_pedido)
            .values({
                id_item_pedido: data.id_item_pedido,
                nome_item_pedido: data.nome_item_pedido,
                categoria: data.categoria,
                quantidade: data.quantidade,
                preco_unitario: data.preco_unitario,
                preco_subtotal: data.quantidade * data.preco_unitario,
                is_ativo: true,
                id_pedido: data.id_pedido
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(item_pedido);
    }

    async findByPedido(idPedido) {
        return await this.db
            .select()
            .from(item_pedido)
            .where(eq(item_pedido.id_pedido, idPedido));
    }

    async findById(idItem) {
        return await this.db
            .select()
            .from(item_pedido)
            .where(eq(item_pedido.id_item_pedido, idItem));
    }

    async update(idItem, data) {
        const result = await this.db
            .update(item_pedido)
            .set({
                ...data,
                preco_subtotal: data.quantidade * data.preco_unitario
            })
            .where(eq(item_pedido.id_item_pedido, idItem))
            .returning();

        return result[0];
    }

    async deletar(idItem) {
        const result = await this.db
            .update(item_pedido)
            .set({ is_ativo: false })
            .where(eq(item_pedido.id_item_pedido, idItem))
            .returning();

        return result[0];
    }
}
