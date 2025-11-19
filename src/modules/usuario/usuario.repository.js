import db from '../../infra/database.js';
import { eq } from 'drizzle-orm';
import { usuario } from '../../infra/db/schema.js';

export class UsuarioRepository {
    constructor() {
        this.db = db
    }

    async create(data) {
        const result = await this.db.insert(usuario).values({
            id_usuario: data.id_usuario,
            nome_usuario: data.nome_usuario,
            tipo: data.tipo,
            cpf: data.cpf,
            data_nascimento: data.data_nascimento,
            telefone: data.telefone,
            email: data.email,
            senha: data.senha,
            is_ativo: data.is_ativo,
        }).returning()

        return result[0]
    }

    async findAll() {
        return await this.db.select().from(usuario)
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(usuario)
            .where(eq(usuario.id_usuario, id))

        return result[0] || null
    }

    async update(id, data) {
        const result = await this.db
            .update(usuario)
            .set(data)
            .where(eq(usuario.id_usuario, id))
            .returning()

        return result[0]
    }

    async deletear(id) {
        const result = await this.db
            .update(usuario)
            .set({ is_ativo: false })
            .where(eq(usuario.id_usuario, id))
            .returning()

        return result[0]
    }
}
