import { SessaoRepository } from './sessao.repository.js';
import crypto from 'crypto';

export class SessaoService {
    constructor() {
        this.sessaoRepository = new SessaoRepository();
    }

    async create(data) {
        const novaSessao = {
            id_sessao: crypto.randomUUID(),
            idioma: data.idioma,
            dimensao: data.dimensao,
            data: data.data,
            horario: data.horario,
            id_sala: data.id_sala,
            id_filme: data.id_filme
        };

        return await this.sessaoRepository.create(novaSessao);
    }

    async getAll() {
        return await this.sessaoRepository.findAll();
    }

    async getById(id) {
        const sessao = await this.sessaoRepository.findById(id);
        if (!sessao) throw new Error('Sessão não encontrada.');
        return sessao;
    }

    async getByFilme(idFilme) {
        return await this.sessaoRepository.findByFilmeId(idFilme);
    }


    async update(id, data) {
        const existente = await this.sessaoRepository.findById(id);
        if (!existente) throw new Error('Sessão não encontrada.');
        return await this.sessaoRepository.update(id, data);
    }

    async delete(id) {
        const existente = await this.sessaoRepository.findById(id);
        if (!existente) throw new Error('Sessão não encontrada.');
        return await this.sessaoRepository.delete(id);
    }
}
