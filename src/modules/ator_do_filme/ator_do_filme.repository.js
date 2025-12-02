import db from '../../infra/database.js';
import { eq, and } from 'drizzle-orm';
import { ator_do_filme } from '../../infra/db/schema.js';

export class AtorDoFilmeRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(ator_do_filme)
            .values({
                id_ator: data.id_ator,
                id_filme: data.id_filme,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(ator_do_filme);
    }

    async findByFilme(idFilme) {
        return await this.db
            .select()
            .from(ator_do_filme)
            .where(eq(ator_do_filme.id_filme, idFilme));
    }

    async findByAtor(idAtor) {
        return await this.db
            .select()
            .from(ator_do_filme)
            .where(eq(ator_do_filme.id_ator, idAtor));
    }

    async update(idAtor, idFilme, data) {
        const result = await this.db
            .update(ator_do_filme)
            .set(data)
            .where(
                and(
                    eq(ator_do_filme.id_ator, idAtor),
                    eq(ator_do_filme.id_filme, idFilme)
                )
            )
            .returning();

        return result[0];
    }

    async deletar(idAtor, idFilme) {
        const result = await this.db
            .update(ator_do_filme)
            .set({ is_ativo: false })
            .where(
                and(
                    eq(ator_do_filme.id_ator, idAtor),
                    eq(ator_do_filme.id_filme, idFilme)
                )
            )
            .returning();

        return result[0];
    }
}
