import { UsuarioRepository } from "./usuario.repository.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { encryptCPF } from "../../utils/cryptoCpf.js";
// import { enviarEmail } from "../../../config/email.js"

export class UsuarioService {
    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11) return false;
        if (/^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let resto = (soma * 10) % 11;
        resto = resto === 10 ? 0 : resto;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        resto = resto === 10 ? 0 : resto;

        return resto === parseInt(cpf.charAt(10));
    }

    async create(data) {
        const senhaHash = await bcrypt.hash(data.senha, 10);
        const cpfLimpo = data.cpf.replace(/\D/g, "");
        if (!this.validarCPF(cpfLimpo)) {
            throw new Error("CPF inválido.");
        }
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
