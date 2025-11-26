import { DiretorRepository } from "./diretor.repository.js"
import crypto from "crypto"

export class DiretorService {
    constructor() {
        this.diretorRepository = new DiretorRepository()
    }

    async create(data) {
        const novoDiretor = {
            id_diretor: crypto.randomUUID(),
            nome_diretor: data.nome_diretor,
            is_ativo: true
        }

        return await this.diretorRepository.create(novoDiretor)
    }
    
    async getAll() {
        return await this.diretorRepository.findAll()
    }

    async getById(id) {
        const diretor = await this.diretorRepository.findById(id)
        if (!diretor) throw new Error("Usuário não encontrado.")
        return diretor
    }

    async update(id, data) {
        const existente = await this.diretorRepository.findById(id)
        if (!existente) throw new Error("Usuário não encontrado.")

        return await this.diretorRepository.update(id, data)
    }

    async delete(id) {
        const existente = await this.diretorRepository.findById(id)
        if (!existente) throw new Error("Usuário não encontrado.")

        return await this.diretorRepository.deletear(id)
    }
}
