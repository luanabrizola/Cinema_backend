import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { genero } from '../../infra/db/schema.js';

export class GeneroRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(genero)
            .values({
                id_genero: data.id_genero,
                nome_genero: data.nome_genero,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(genero);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(genero)
            .where(eq(genero.id_genero, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(genero)
            .set(data)
            .where(eq(genero.id_genero, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(genero)
            .set({ is_ativo: false })
            .where(eq(genero.id_genero, id))
            .returning();

        return result[0];
    }
}
