import crypto from "crypto";
import { AssentoRepository } from "./assento.repository.js";

export class AssentoService {
    constructor() {
        this.assentoRepository = new AssentoRepository();
    }

    async create(data) {
        const novoAssento = {
            id_assento: crypto.randomUUID(),
            fila: data.fila,
            numero: data.numero,
            tipo: data.tipo,
            is_ativo: true,
            id_sala: data.id_sala
        };

        return await this.assentoRepository.create(novoAssento);
    }

    async getAll() {
        return await this.assentoRepository.findAll();
    }

    async getById(id) {
        const assento = await this.assentoRepository.findById(id);
        if (!assento) throw new Error("Assento não encontrado.");
        return assento;
    }

    async getBySala(id_sala) {
    return await this.assentoRepository.findBySala(id_sala);
    }


    async update(id, data) {
        const existente = await this.assentoRepository.findById(id);
        if (!existente) throw new Error("Assento não encontrado.");

        return await this.assentoRepository.update(id, data);
    }

    async delete(id) {
        const existente = await this.assentoRepository.findById(id);
        if (!existente) throw new Error("Assento não encontrado.");

        return await this.assentoRepository.deletar(id);
    }
}
