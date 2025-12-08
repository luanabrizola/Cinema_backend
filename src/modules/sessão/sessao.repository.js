import { db } from '../../db.js';
import { sessao } from './sessao.schema.js'; 

export class SessaoRepository {
    async create(data) {
        const [novaSessao] = await db.insert(sessao).values(data).returning();
        return novaSessao;
    }

    async findAll() {
        return await db.select().from(sessao);
    }

    async findById(id) {
        return await db.select().from(sessao).where(sessao.id_sessao.eq(id)).get();
    }

    async update(id, data) {
        const [atualizado] = await db.update(sessao)
            .set(data)
            .where(sessao.id_sessao.eq(id))
            .returning();
        return atualizado;
    }

    async delete(id) {
        return await db.delete(sessao)
            .where(sessao.id_sessao.eq(id));
    }
}
