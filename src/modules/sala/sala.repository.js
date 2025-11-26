import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { sala } from '../../infra/db/schema.js';

export class SalaRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(sala)
            .values({
                id_sala: data.id_sala,
                nome_sala: data.nome_sala,
                capacidade: data.capacidade,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(sala);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(sala)
            .where(eq(sala.id_sala, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(sala)
            .set(data)
            .where(eq(sala.id_sala, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(sala)
            .set({ is_ativo: false })
            .where(eq(sala.id_sala, id))
            .returning();

        return result[0];
    }
}
