import { UsuarioController } from "./usuario.controller.js";

export async function usuarioRoutes(fastify) {

    const controller = new UsuarioController();

    fastify.get('/usuario', controller.getUsuarios.bind(controller));
    fastify.get('/usuario/:id', controller.getUsuarioById.bind(controller));
    fastify.post('/usuario', controller.createUsuario.bind(controller));
    fastify.put('/usuario/:id', controller.updateUsuario.bind(controller));
    fastify.delete('/usuario/:id', controller.deleteUsuario.bind(controller));

    fastify.post('/login', async (request, reply) => {
        const { email, senha } = request.body;
        try {
            const usuario = await controller.usuarioService.login(email, senha);
            return reply.code(200).send(usuario);
        } catch (err) {
            return reply.code(401).send({ error: err.message });
        }
    });
}



