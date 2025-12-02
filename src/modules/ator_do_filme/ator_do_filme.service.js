import { AtorDoFilmeRepository } from "./ator_do_filme.repository.js";
export class AtorDoFilmeService {
    constructor() {
        this.atorDoFilmeRepository = new AtorDoFilmeRepository();
    }

    async create(data) {
        const novo = {
            id_ator: data.id_ator,
            id_filme: data.id_filme,
            is_ativo: true
        };

        return await this.atorDoFilmeRepository.create(novo);
    }

    async getAll() {
        return await this.atorDoFilmeRepository.findAll();
    }

    async getByFilme(idFilme) {
        const result = await this.atorDoFilmeRepository.findByFilme(idFilme);
        if (!result || result.length === 0) {
            throw new Error("Nenhum ator encontrado para esse filme.");
        }
        return result;
    }

    async getByAtor(idAtor) {
        const result = await this.atorDoFilmeRepository.findByAtor(idAtor);
        if (!result || result.length === 0) {
            throw new Error("Nenhum filme encontrado para esse ator.");
        }
        return result;
    }

    async update(idAtor, idFilme, data) {
        const existentes = await this.atorDoFilmeRepository.findByFilme(idFilme);
        const relacao = existentes.find(r => r.id_ator === idAtor);

        if (!relacao) {
            throw new Error("Este ator não está vinculado a este filme.");
        }

        return await this.atorDoFilmeRepository.update(idAtor, idFilme, data);
    }

    async delete(idAtor, idFilme) {
        const existentes = await this.atorDoFilmeRepository.findByFilme(idFilme);
        const relacao = existentes.find(r => r.id_ator === idAtor);

        if (!relacao) {
            throw new Error("Este ator não está vinculado a este filme.");
        }

        return await this.atorDoFilmeRepository.deletar(idAtor, idFilme);
    }

}
