import { DiretorDoFilmeRepository } from "./diretor_do_filme.repository.js";
export class DiretorDoFilmeService {
    constructor() {
        this.diretorDoFilmeRepository = new DiretorDoFilmeRepository();
    }

    async create(data) {
        const novo = {
            id_diretor: data.id_diretor,
            id_filme: data.id_filme,
            is_ativo: true
        };

        return await this.diretorDoFilmeRepository.create(novo);
    }

    async getAll() {
        return await this.diretorDoFilmeRepository.findAll();
    }

    async getByFilme(idFilme) {
        const result = await this.diretorDoFilmeRepository.findByFilme(idFilme);
        if (!result || result.length === 0) {
            throw new Error("Nenhum diretor encontrado para esse filme.");
        }
        return result;
    }

    async getByDiretor(idDiretor) {
        const result = await this.diretorDoFilmeRepository.findByDiretor(idDiretor);
        if (!result || result.length === 0) {
            throw new Error("Nenhum filme encontrado para esse diretor.");
        }
        return result;
    }

    async update(idDiretor, idFilme, data) {
        const existentes = await this.diretorDoFilmeRepository.findByFilme(idFilme);
        const relacao = existentes.find(r => r.id_diretor === idDiretor);

        if (!relacao) {
            throw new Error("Este diretor não está vinculado a este filme.");
        }

        return await this.diretorDoFilmeRepository.update(idDiretor, idFilme, data);
    }

    async delete(idDiretor, idFilme) {
        const existentes = await this.diretorDoFilmeRepository.findByFilme(idFilme);
        const relacao = existentes.find(r => r.id_diretor === idDiretor);

        if (!relacao) {
            throw new Error("Este diretor não está vinculado a este filme.");
        }

        return await this.diretorDoFilmeRepository.deletar(idDiretor, idFilme);
    }

}
