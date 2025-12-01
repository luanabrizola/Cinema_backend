import Fastify from 'fastify';
import cors from '@fastify/cors';
import { usuarioRoutes } from './modules/usuario/usuario.routes.js';
import { diretorRoutes } from './modules/diretor/diretor.routes.js';
import { generoRoutes } from './modules/genero/genero.routes.js';
import { atorRoutes } from './modules/ator/ator.routes.js';
import { tipoRoutes } from './modules/tipo/tipo.routes.js';
import { salaRoutes } from './modules/sala/sala.routes.js';
import { pedidoRoutes } from './modules/pedido/pedido.routes.js';
import { filmeRoutes } from './modules/filme/filme.routes.js';
import { assentoRoutes } from './modules/assento/assento.routes.js';
import { atorDoFilmeRoutes } from './modules/ator_do_filme/ator_do_filme.routes.js';
import { diretorDoFilmeRoutes } from './modules/diretor_do_filme/diretor_do_filme.routes.js';
import { generoDoFilmeRoutes } from './modules/genero_do_filme/genero_do_filme.routes.js';

const app = Fastify();

await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
});

app.register(usuarioRoutes)
app.register(diretorRoutes)
app.register(generoRoutes)
app.register(atorRoutes)
app.register(tipoRoutes)
app.register(salaRoutes)
app.register(pedidoRoutes)
app.register(filmeRoutes)
app.register(assentoRoutes)
app.register(atorDoFilmeRoutes)
app.register(diretorDoFilmeRoutes)
app.register(generoDoFilmeRoutes)

app.listen({ port: 3333 }, () => {
    console.log('Servidor rodando na porta 3333');
});
