import { FilmeRepository } from "./filme.repository.js"
import crypto from "crypto"

export class FilmeService {
    constructor() {
        this.filmeRepository = new FilmeRepository()
    }

    async create(data) {
        const novoFilme = {
            id_filme: crypto.randomUUID(),
            nome_filme: data.nome_filme,
            duracao: data.duracao,
            sinopse: data.sinopse,
            ano_lancamento: data.ano_lancamento,
            classificacao: data.classificacao,
            foto_capa: data.foto_capa,
            is_ativo: true
        }

        return await this.filmeRepository.create(novoFilme)
    }
    
    async getAll() {
        return await this.filmeRepository.findAll()
    }

    async getById(id) {
        const filme = await this.filmeRepository.findById(id)
        if (!filme) throw new Error("Filme não encontrado.")
        return filme
    }

    async update(id, data) {
        const existente = await this.filmeRepository.findById(id)
        if (!existente) throw new Error("Filme não encontrado.")

        return await this.filmeRepository.update(id, data)
    }

    async delete(id) {
        const existente = await this.filmeRepository.findById(id)
        if (!existente) throw new Error("Filme não encontrado.")

        return await this.filmeRepository.deletar(id)
    }
}
