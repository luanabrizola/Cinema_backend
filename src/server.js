import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path from 'path';

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
import { itemPedidoRoutes } from './modules/item_pedido/item_pedido.routes.js';

const app = Fastify();

await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
});

await app.register(multipart, {
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

await app.register(fastifyStatic, {
    root: path.join(process.cwd(), 'imagens'),
    prefix: '/imagens/'
});

app.register(usuarioRoutes);
app.register(diretorRoutes);
app.register(generoRoutes);
app.register(atorRoutes);
app.register(tipoRoutes);
app.register(salaRoutes);
app.register(pedidoRoutes);
app.register(filmeRoutes);
app.register(assentoRoutes);
app.register(atorDoFilmeRoutes);
app.register(diretorDoFilmeRoutes);
app.register(generoDoFilmeRoutes);
app.register(itemPedidoRoutes);

try {
    await app.listen({ port: 3333, host: '0.0.0.0' });
    console.log('Servidor rodando na porta 3333');
} catch (err) {
    console.error(err);
    process.exit(1);
}

