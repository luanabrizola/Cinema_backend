import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { ator } from '../../infra/db/schema.js';

export class AtorRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(ator)
            .values({
                id_ator: data.id_ator,
                nome_ator: data.nome_ator,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(ator);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(ator)
            .where(eq(ator.id_ator, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(ator)
            .set(data)
            .where(eq(ator.id_ator, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(ator)
            .set({ is_ativo: false })
            .where(eq(ator.id_ator, id))
            .returning();

        return result[0];
    }
}
