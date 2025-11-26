import Fastify from 'fastify';
import cors from '@fastify/cors';
import { usuarioRoutes } from './modules/usuario/usuario.routes.js';
import { diretorRoutes } from './modules/diretor/diretor.routes.js';
import { generoRoutes } from './modules/genero/genero.routes.js';

const app = Fastify();

await app.register(cors, {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
});

app.register(usuarioRoutes)
app.register(diretorRoutes)
app.register(generoRoutes)

app.listen({ port: 3333 }, () => {
    console.log('Servidor rodando na porta 3333');
});
