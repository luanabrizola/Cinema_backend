import {GeneroRepository} from './genero.repository.js'
import crypto from "crypto"

export class GeneroService {
    constructor() {
        this.generoRepository = new GeneroRepository()
    }

    async create(data) {
        const novoGenero = {
            id_genero: crypto.randomUUID(),
            nome_genero: data.nome_genero,
            is_ativo: true
        }

        return await this.generoRepository.create(novoGenero)
    }
    
    async getAll() {
        return await this.generoRepository.findAll()
    }

    async getById(id) {
        const genero = await this.generoRepository.findById(id)
        if (!genero) throw new Error("Genero não encontrado.")
        return genero
    }

    async update(id, data) {
        const existente = await this.generoRepository.findById(id)
        if (!existente) throw new Error("Genero não encontrado.")

        return await this.generoRepository.update(id, data)
    }

    async delete(id) {
        const existente = await this.generoRepository.findById(id)
        if (!existente) throw new Error("Genero não encontrado.")

        return await this.generoRepository.deletar(id)
    }
}
