import { UsuarioRepository } from "./usuario.repository.js"
import crypto from "crypto"

export class UsuarioService {
    constructor() {
        this.usuarioRepository = new UsuarioRepository()
    }

    async create(data) {
        const novoUsuario = {
            id_usuario: crypto.randomUUID(),
            nome_usuario: data.nome_usuario,
            tipo: data.tipo,
            cpf: data.cpf,
            data_nascimento: data.data_nascimento,
            telefone: data.telefone,
            email: data.email,
            senha: data.senha,
            is_ativo: true
        }

        return await this.usuarioRepository.create(novoUsuario)
    }

    async getAll() {
        return await this.usuarioRepository.findAll()
    }

    async getById(id) {
        const usuario = await this.usuarioRepository.findById(id)
        if (!usuario) throw new Error("Usuário não encontrado.")
        return usuario
    }

    async update(id, data) {
        const existente = await this.usuarioRepository.findById(id)
        if (!existente) throw new Error("Usuário não encontrado.")

        return await this.usuarioRepository.update(id, data)
    }

    async delete(id) {
        const existente = await this.usuarioRepository.findById(id)
        if (!existente) throw new Error("Usuário não encontrado.")

        return await this.usuarioRepository.deletear(id)
    }
}
