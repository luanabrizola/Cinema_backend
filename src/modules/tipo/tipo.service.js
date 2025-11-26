import { TipoRepository } from "./tipo.repository.js"
import crypto from "crypto"

export class TipoService {
    constructor() {
        this.tipoRepository = new TipoRepository()
    }

    async create(data) {
        const novoTipo = {
            id_tipo: crypto.randomUUID(),
            nome_tipo: data.nome_tipo,
            is_ativo: true
        }

        return await this.tipoRepository.create(novoTipo)
    }
    
    async getAll() {
        return await this.tipoRepository.findAll()
    }

    async getById(id) {
        const tipo = await this.tipoRepository.findById(id)
        if (!tipo) throw new Error("Tipo não encontrado.")
        return tipo
    }

    async update(id, data) {
        const existente = await this.tipoRepository.findById(id)
        if (!existente) throw new Error("Tipo não encontrado.")

        return await this.tipoRepository.update(id, data)
    }

    async delete(id) {
        const existente = await this.tipoRepository.findById(id)
        if (!existente) throw new Error("Tipo não encontrado.")

        return await this.tipoRepository.deletar(id)
    }
}
