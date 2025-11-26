import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { diretor } from '../../infra/db/schema.js';

export class DiretorRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(diretor)
            .values({
                id_diretor: data.id_diretor,
                nome_diretor: data.nome_diretor,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(diretor);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(diretor)
            .where(eq(diretor.id_diretor, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(diretor)
            .set(data)
            .where(eq(diretor.id_diretor, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(diretor)
            .set({ is_ativo: false })
            .where(eq(diretor.id_diretor, id))
            .returning();

        return result[0];
    }
}
