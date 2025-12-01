import { GeneroDoFilmeRepository } from "./genero_do_filme.repository.js";

export class GeneroDoFilmeService {
    constructor() {
        this.generoDoFilmeRepository = new GeneroDoFilmeRepository();
    }

    async create(data) {
        const novo = {
            id_genero: data.id_genero,
            id_filme: data.id_filme,
            is_ativo: true
        };

        return await this.generoDoFilmeRepository.create(novo);
    }

    async getAll() {
        return await this.generoDoFilmeRepository.findAll();
    }

    async getByFilme(idFilme) {
        const result = await this.generoDoFilmeRepository.findByFilme(idFilme);
        if (!result || result.length === 0) {
            throw new Error("Nenhum gênero encontrado para esse filme.");
        }
        return result;
    }

    async getByGenero(idGenero) {
        const result = await this.generoDoFilmeRepository.findByGenero(idGenero);
        if (!result || result.length === 0) {
            throw new Error("Nenhum filme encontrado para esse gênero.");
        }
        return result;
    }

    async update(idGenero, idFilme, data) {
        const existentes = await this.generoDoFilmeRepository.findByFilme(idFilme);
        const relacao = existentes.find(r => r.id_genero === idGenero);

        if (!relacao) {
            throw new Error("Este gênero não está vinculado a este filme.");
        }

        return await this.generoDoFilmeRepository.update(idGenero, idFilme, data);
    }

    async delete(idGenero, idFilme) {
        const existentes = await this.generoDoFilmeRepository.findByFilme(idFilme);
        const relacao = existentes.find(r => r.id_genero === idGenero);

        if (!relacao) {
            throw new Error("Este gênero não está vinculado a este filme.");
        }

        return await this.generoDoFilmeRepository.deletar(idGenero, idFilme);
    }
}
