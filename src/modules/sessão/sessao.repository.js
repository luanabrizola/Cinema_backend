import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { sessao } from '../../infra/db/schema.js';

export class SessaoRepository {

    async create(data) {
        const [nova] = await db.insert(sessao).values(data).returning();
        return nova;
    }

    async findAll() {
        return await db.select().from(sessao);
    }

    async findById(id) {
        const result = await db
            .select()
            .from(sessao)
            .where(eq(sessao.id_sessao, id));

        return result[0] || null;
    }

    async findByFilmeId(idFilme) {
        return await db
            .select()
            .from(sessao)
            .where(eq(sessao.id_filme, idFilme));
    }

    async update(id, data) {
        const [upd] = await db
            .update(sessao)
            .set(data)
            .where(eq(sessao.id_sessao, id))
            .returning();
        return upd;
    }

    async delete(id) {
        return await db
            .delete(sessao)
            .where(eq(sessao.id_sessao, id));
    }
}
