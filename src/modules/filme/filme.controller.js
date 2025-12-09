import { FilmeService } from './filme.service.js';
import fs from 'fs';
import path from 'path';

export class FilmeController {

    constructor() {
        this.filmeService = new FilmeService();
    }

    async getFilmes(request, reply) {
        try {
            const filmes = await this.filmeService.getAll();
            return reply.send(filmes);
        } catch (error) {
            return reply.code(500).send({ error: error.message });
        }
    }

    async getFilmeById(request, reply) {
        try {
            const id = request.params.id;
            const filme = await this.filmeService.getById(id);

            if (!filme) {
                return reply.code(404).send({ error: "Filme não encontrado" });
            }

            return reply.send(filme);
        } catch (error) {
            return reply.code(500).send({ error: error.message });
        }
    }

    async createFilme(request, reply) {
        try {
            const parts = request.parts();
            const data = {};
            let filePath = null;

            for await (const part of parts) {

                if (part.type === 'file') {
                    const fileName = `${Date.now()}-${part.filename}`;
                    filePath = `imagens/${fileName}`;

                    await fs.promises.writeFile(
                        filePath,
                        await part.toBuffer()
                    );
                } else {
                    data[part.fieldname] = part.value;
                }
            }

            data.foto_capa = filePath;

            const novoFilme = await this.filmeService.create(data);

            return reply.code(201).send({
                message: 'Filme criado com sucesso!',
                filme: novoFilme
            });

        } catch (error) {
            console.error(error);
            return reply.code(400).send({ error: error.message });
        }
    }

    async updateFilme(request, reply) {
        try {
            const id = request.params.id;
            const body = request.body;

            const atualizado = await this.filmeService.update(id, body);

            return reply.send({
                message: "Filme atualizado com sucesso",
                filme: atualizado
            });

        } catch (error) {
            return reply.code(500).send({ error: error.message });
        }
    }

    async deleteFilme(request, reply) {
        try {
            const id = request.params.id;

            await this.filmeService.delete(id);

            return reply.send({ message: "Filme excluído com sucesso" });

        } catch (error) {
            return reply.code(500).send({ error: error.message });
        }
    }
}
