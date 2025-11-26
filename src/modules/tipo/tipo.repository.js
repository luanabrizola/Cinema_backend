import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { tipo } from '../../infra/db/schema.js';

export class TipoRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(tipo)
            .values({
                id_tipo: data.id_tipo,
                nome_tipo: data.nome_tipo,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(tipo);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(tipo)
            .where(eq(tipo.id_tipo, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(tipo)
            .set(data)
            .where(eq(tipo.id_tipo, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(tipo)
            .set({ is_ativo: false })
            .where(eq(tipo.id_tipo, id))
            .returning();

        return result[0];
    }
}
