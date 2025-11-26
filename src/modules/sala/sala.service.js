import { SalaRepository } from "./sala.repository.js"
import crypto from "crypto"

export class SalaService {
    constructor() {
        this.salaRepository = new SalaRepository()
    }

    async create(data) {
        const novoSala = {
            id_sala: crypto.randomUUID(),
            nome_sala: data.nome_sala,
            capacidade: data.capacidade,
            is_ativo: true
        }

        return await this.salaRepository.create(novoSala)
    }
    
    async getAll() {
        return await this.salaRepository.findAll()
    }

    async getById(id) {
        const sala = await this.salaRepository.findById(id)
        if (!sala) throw new Error("Sala não encontrado.")
        return sala
    }

    async update(id, data) {
        const existente = await this.salaRepository.findById(id)
        if (!existente) throw new Error("Sala não encontrado.")

        return await this.salaRepository.update(id, data)
    }

    async delete(id) {
        const existente = await this.salaRepository.findById(id)
        if (!existente) throw new Error("Sala não encontrado.")

        return await this.salaRepository.deletar(id)
    }
}
