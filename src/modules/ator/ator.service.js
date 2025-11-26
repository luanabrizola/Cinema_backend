import { AtorRepository } from "./ator.repository.js"
import crypto from "crypto"

export class AtorService {
    constructor() {
        this.atorRepository = new AtorRepository()
    }

    async create(data) {
        const novoAtor = {
            id_ator: crypto.randomUUID(),
            nome_ator: data.nome_ator,
            is_ativo: true
        }

        return await this.atorRepository.create(novoAtor)
    }
    
    async getAll() {
        return await this.atorRepository.findAll()
    }

    async getById(id) {
        const ator = await this.atorRepository.findById(id)
        if (!ator) throw new Error("Ator não encontrado.")
        return ator
    }

    async update(id, data) {
        const existente = await this.atorRepository.findById(id)
        if (!existente) throw new Error("Ator não encontrado.")

        return await this.atorRepository.update(id, data)
    }

    async delete(id) {
        const existente = await this.atorRepository.findById(id)
        if (!existente) throw new Error("Ator não encontrado.")

        return await this.atorRepository.deletar(id)
    }
}
