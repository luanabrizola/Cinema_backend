import { DiretorDoFilmeService } from "./diretor_do_filme.service.js";

export class DiretorDoFilmeController {

    constructor() {
        this.service = new DiretorDoFilmeService();
    }

    async getAll(request, reply) {
        const dados = await this.service.getAll();
        return reply.send(dados);
    }

    async getByFilme(request, reply) {
        const { id_filme } = request.params;

        try {
            const result = await this.service.getByFilme(id_filme);
            return reply.send(result);
        } catch (err) {
            return reply.code(404).send({
                message: "Filme não encontrado."
            });
        }
    }

    async getByDiretor(request, reply) {
        const { id_diretor } = request.params;

        try {
            const result = await this.service.getByDiretor(id_diretor);
            return reply.send(result);
        } catch (err) {
            return reply.code(404).send({
                message: "Diretor não encontrado."
            });
        }
    }

    async create(request, reply) {
        try {
            const novo = await this.service.create(request.body);
            return reply.code(201).send({
                message: "Vínculo diretor do filme criado com sucesso!",
                vinculo: novo
            });
        } catch (err) {
            return reply.code(400).send({ message: err.message });
        }
    }

    async update(request, reply) {
        const { id_diretor, id_filme } = request.params;

        try {
            const atualizado = await this.service.update(id_diretor, id_filme, request.body);
            return reply.send(atualizado);
        } catch (err) {
            return reply.code(404).send({
                message: "Este diretor não está vinculado a este filme."
            });
        }
    }

    async delete(request, reply) {
        const { id_diretor, id_filme } = request.params;

        try {
            await this.service.delete(id_diretor, id_filme);
            return reply.code(204).send();
        } catch (err) {
            return reply.code(404).send({
                message: "Este diretor não está vinculado a este filme."
            });
        }
    }
}
