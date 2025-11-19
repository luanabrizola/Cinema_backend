import { UsuarioController } from "./usuario.controller.js";

export async function usuarioRoutes(fastify) {

    const controller = new UsuarioController();

    fastify.get('/usuario', controller.getUsuarios.bind(controller));
    fastify.get('/usuario/:id', controller.getUsuarioById.bind(controller));
    fastify.post('/usuario', controller.createUsuario.bind(controller));
    fastify.put('/usuario/:id', controller.updateUsuario.bind(controller));
    fastify.delete('/usuario/:id', controller.deleteUsuario.bind(controller));
}
