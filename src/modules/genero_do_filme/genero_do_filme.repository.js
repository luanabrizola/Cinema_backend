import db from '../../infra/database.js';
import { eq, and } from 'drizzle-orm';
import { genero_do_filme } from '../../infra/db/schema.js';

export class GeneroDoFilmeRepository {
constructor() {
this.db = db;
}

async create(data) {
    const result = await this.db
        .insert(genero_do_filme)
        .values({
            id_genero: data.id_genero,
            id_filme: data.id_filme,
            is_ativo: data.is_ativo
        })
        .returning();

    return result[0];
}

async findAll() {
    return await this.db.select().from(genero_do_filme);
}

async findByFilme(idFilme) {
    return await this.db
        .select()
        .from(genero_do_filme)
        .where(eq(genero_do_filme.id_filme, idFilme));
}

async findByGenero(idGenero) {
    return await this.db
        .select()
        .from(genero_do_filme)
        .where(eq(genero_do_filme.id_genero, idGenero));
}

async update(idGenero, idFilme, data) {
    const result = await this.db
        .update(genero_do_filme)
        .set(data)
        .where(
            and(
                eq(genero_do_filme.id_genero, idGenero),
                eq(genero_do_filme.id_filme, idFilme)
            )
        )
        .returning();

    return result[0];
}

async deletar(idGenero, idFilme) {
    const result = await this.db
        .update(genero_do_filme)
        .set({ is_ativo: false })
        .where(
            and(
                eq(genero_do_filme.id_genero, idGenero),
                eq(genero_do_filme.id_filme, idFilme)
            )
        )
        .returning();

    return result[0];
}
}
