import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { pedido } from '../../infra/db/schema.js';

export class PedidoRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(pedido)
            .values({
                id_pedido: data.id_pedido,
                preco_total: data.preco_total,
                forma_pagamento: data.forma_pagamento,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(pedido);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(pedido)
            .where(eq(pedido.id_pedido, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(pedido)
            .set(data)
            .where(eq(pedido.id_pedido, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(pedido)
            .set({ is_ativo: false })
            .where(eq(pedido.id_pedido, id))
            .returning();

        return result[0];
    }
}
