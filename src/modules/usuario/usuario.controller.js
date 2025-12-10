import { UsuarioService } from "./usuario.service.js";

export class UsuarioController {
    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async getUsuarios(request, reply) {
        try {
            const usuarios = await this.usuarioService.getAll();
            return reply.send(usuarios);
        } catch (error) {
            return reply.code(500).send({ error: error.message });
        }
    }

    async getUsuarioById(request, reply) {
        const { id } = request.params;
        try {
            const usuario = await this.usuarioService.getById(id);
            return reply.send(usuario);
        } catch (error) {
            return reply.code(404).send({ message: "Usuário não encontrado" });
        }
    }

    async createUsuario(request, reply) {
        try {
            const novoUsuario = await this.usuarioService.create(request.body);
            return reply.code(201).send({
                message: "Usuário criado com sucesso!",
                usuario: novoUsuario
            });
        } catch (error) {
            return reply.code(400).send({ error: error.message || "Erro ao criar usuário." });
        }
    }

    async updateUsuario(request, reply) {
        const { id } = request.params;
        try {
            const usuarioAtualizado = await this.usuarioService.update(id, request.body);
            return reply.send(usuarioAtualizado);
        } catch (error) {
            return reply.code(404).send({ message: "Usuário não encontrado" });
        }
    }

    async deleteUsuario(request, reply) {
        const { id } = request.params;
        try {
            await this.usuarioService.delete(id);
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({ message: "Usuário não encontrado" });
        }
    }
}
