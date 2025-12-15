import { UsuarioRepository } from "./usuario.repository.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { encryptCPF } from "../../utils/cryptoCpf.js";
// import { enviarEmail } from "../../../config/email.js"

export class UsuarioService {
    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async create(data) {
        const senhaHash = await bcrypt.hash(data.senha, 10);
        const cpfLimpo = data.cpf.replace(/\D/g, "");
        const cpfCriptografado = encryptCPF(cpfLimpo);

        const novoUsuario = {
            id_usuario: crypto.randomUUID(),
            nome_usuario: data.nome_usuario,
            tipo: data.tipo || "cliente",
            cpf: cpfCriptografado,
            data_nascimento: data.data_nascimento,
            telefone: data.telefone,
            email: data.email,
            senha: senhaHash,
            is_ativo: true
        };

        const usuarioCriado = await this.usuarioRepository.create(novoUsuario);

        //         const mensagem = `
        // Olá ${usuarioCriado.nome_usuario}!

        // Seu cadastro no Cinema App foi realizado com sucesso.

        // Agora você pode acessar nossas sessões, comprar ingressos e aproveitar os filmes!

        // Atenciosamente,
        // Equipe Cinema App
        //         `;

        //         enviarEmail(usuarioCriado.email, "Bem-vindo ao Cinema App!", mensagem);

        return usuarioCriado;
    }

    async getAll() {
        return await this.usuarioRepository.findAll();
    }

    async getById(id) {
        const usuario = await this.usuarioRepository.findById(id);
        if (!usuario) throw new Error("Usuário não encontrado.");
        const { senha, cpf, ...usuarioSeguro } = usuario;
        return usuarioSeguro;
    }

    async login(email, senha) {
        const usuario = (await this.usuarioRepository.findAll()).find(u => u.email === email);
        if (!usuario) throw new Error("Usuário não encontrado.");

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Senha incorreta.");
        }

        const { senha: _, cpf: __, ...usuarioSeguro } = usuario;
        return usuarioSeguro;
    }

    async update(id, data) {
        const existente = await this.usuarioRepository.findById(id);
        if (!existente) throw new Error("Usuário não encontrado.");
        return await this.usuarioRepository.update(id, data);
    }

    async delete(id) {
        const existente = await this.usuarioRepository.findById(id);
        if (!existente) throw new Error("Usuário não encontrado.");
        return await this.usuarioRepository.deletear(id);
    }
}
