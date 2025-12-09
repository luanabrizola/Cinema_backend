import db from "../../infra/database.js";
import { eq } from "drizzle-orm";
import { assento } from "../../infra/db/schema.js";

export class AssentoRepository {
    constructor() {
        this.db = db;
    }

    async create(data) {
        const result = await this.db
            .insert(assento)
            .values({
                id_assento: data.id_assento,
                fila: data.fila,
                numero: data.numero,
                tipo: data.tipo,
                is_ativo: data.is_ativo,
                id_sala: data.id_sala
            })
            .returning();

        return result[0];
    }

    async findAll() {
        return await this.db.select().from(assento);
    }

    async findById(id) {
        const result = await this.db
            .select()
            .from(assento)
            .where(eq(assento.id_assento, id));

        return result[0] || null;
    }

    async update(id, data) {
        const result = await this.db
            .update(assento)
            .set(data)
            .where(eq(assento.id_assento, id))
            .returning();

        return result[0];
    }

    async deletar(id) {
        const result = await this.db
            .update(assento)
            .set({ is_ativo: false })
            .where(eq(assento.id_assento, id))
            .returning();

        return result[0];
    }
}
