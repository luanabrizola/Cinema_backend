import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { produto } from '../../infra/db/schema.js';

export class ProdutoRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(produto)
            .values({
                id_produto: data.id_produto,
                nome_produto: data.nome_produto,
                preco_unitario: data.preco_unitario,
                categoria: data.categoria,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(produto);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(produto)
            .where(eq(produto.id_produto, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(produto)
            .set(data)
            .where(eq(produto.id_produto, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(produto)
            .set({ is_ativo: false })
            .where(eq(produto.id_produto, id))
            .returning();

        return result[0];
    }
}
