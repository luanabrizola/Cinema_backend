import { AssentoService } from "./assento.service.js";

export class AssentoController {
    constructor() {
        this.assentoService = new AssentoService();
    }

    async getAssentos(req, reply) {
        try {
            const { id_sala } = req.query;

            let result;
            if (id_sala) {
                result = await this.assentoService.getBySala(id_sala);
            } else {
                result = await this.assentoService.getAll();
            }

            reply.send(result);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Erro ao listar assentos." });
        }
    }

    async getAssentoById(request, reply) {
        const { id } = request.params;

        try {
            const assento = await this.assentoService.getById(id);
            return reply.send(assento);
        } catch (error) {
            return reply.code(404).send({ message: "Assento não encontrado" });
        }
    }

    async createAssento(request, reply) {
        try {
            const novo = await this.assentoService.create(request.body);

            return reply.code(201).send({
                message: "Assento criado com sucesso!",
                assento: novo
            });
        } catch (error) {
            return reply.code(400).send({
                error: error.message || "Erro ao criar assento."
            });
        }
    }

    async updateAssento(request, reply) {
        const { id } = request.params;

        try {
            const atualizado = await this.assentoService.update(id, request.body);
            return reply.send(atualizado);
        } catch (error) {
            return reply.code(404).send({ message: "Assento não encontrado" });
        }
    }

    async deleteAssento(request, reply) {
        const { id } = request.params;

        try {
            await this.assentoService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({ message: "Assento não encontrado" });
        }
    }
}
