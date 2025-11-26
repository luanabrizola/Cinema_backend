import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { filme } from '../../infra/db/schema.js';

export class FilmeRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(filme)
            .values({
                id_filme: data.id_filme,
                nome_filme: data.nome_filme,
                duracao: data.duracao,
                sinopse: data.sinopse,
                ano_lancamento: data.ano_lancamento,
                classificacao: data.classificacao,
                foto_capa: data.foto_capa,
                is_ativo: data.is_ativo
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(filme);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(filme)
            .where(eq(filme.id_filme, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(filme)
            .set(data)
            .where(eq(filme.id_filme, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(filme)
            .set({ is_ativo: false })
            .where(eq(filme.id_filme, id))
            .returning();

        return result[0];
    }
}
