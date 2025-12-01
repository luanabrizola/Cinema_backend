import db from '../../infra/database.js';
import { eq, and } from 'drizzle-orm';
import { diretor_do_filme } from '../../infra/db/schema.js';

export class DiretorDoFilmeRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(diretor_do_filme)
            .values({
                id_diretor: data.id_diretor,
                id_filme: data.id_filme,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(diretor_do_filme);
    }

    async findByFilme(idFilme) {
        return await this.db
            .select()
            .from(diretor_do_filme)
            .where(eq(diretor_do_filme.id_filme, idFilme));
    }

    async findByDiretor(idDiretor) {
        return await this.db
            .select()
            .from(diretor_do_filme)
            .where(eq(diretor_do_filme.id_diretor, idDiretor));
    }

    async update(idDiretor, idFilme, data) {
        const result = await this.db
            .update(diretor_do_filme)
            .set(data)
            .where(
                and(
                    eq(diretor_do_filme.id_diretor, idDiretor),
                    eq(diretor_do_filme.id_filme, idFilme)
                )
            )
            .returning();

        return result[0];
    }

    async deletar(idDiretor, idFilme) {
        const result = await this.db
            .update(diretor_do_filme)
            .set({ is_ativo: false })
            .where(
                and(
                    eq(diretor_do_filme.id_diretor, idDiretor),
                    eq(diretor_do_filme.id_filme, idFilme)
                )
            )
            .returning();

        return result[0];
    }
}
