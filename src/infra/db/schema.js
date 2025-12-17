import { pgTable, uuid, text, varchar, boolean, date, numeric, time, integer, primaryKey, interval } from 'drizzle-orm/pg-core';

export const sala = pgTable('sala', {
    id_sala: uuid('id_sala').primaryKey(),
    nome_sala: varchar('nome_sala').notNull(),
    capacidade: integer('capacidade').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const sessao = pgTable('sessao', {
    id_sessao: uuid('id_sessao').primaryKey(),
    idioma: varchar('idioma').notNull(),
    dimensao: varchar('dimensao').notNull(),
    data: date('data').notNull(),
    horario: time('horario').notNull(),
    id_sala: uuid('id_sala')
        .notNull()
        .references(() => sala.id_sala, { onDelete: 'cascade' }),
    id_filme: uuid('id_filme')
        .notNull()
        .references(() => filme.id_filme, { onDelete: 'cascade' }),
});

export const assento = pgTable('assento', {
    id_assento: uuid('id_assento').primaryKey(),
    fila: varchar('fila').notNull(),
    tipo: varchar('tipo').notNull(),
    numero: integer('numero').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
    id_sala: uuid('id_sala')
        .notNull()
        .references(() => sala.id_sala, { onDelete: 'cascade' })
});

export const usuario = pgTable('usuario', {
    id_usuario: uuid('id_usuario').primaryKey(),
    nome_usuario: varchar('nome_usuario').notNull(),
    tipo: text('tipo').notNull(),
    cpf: varchar('cpf').notNull(),
    data_nascimento: date('data_nascimento').notNull(),
    telefone: varchar('telefone', {length: 12}),
    email: text('email').notNull(),
    senha: varchar('senha').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const tipo = pgTable('tipo', {
    id_tipo: uuid('id_tipo').primaryKey(),
    nome_tipo: varchar('nome_tipo').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const produto = pgTable('produto', {
    id_produto: uuid('id_produto').primaryKey(),
    nome_produto: varchar('nome_produto').notNull(),
    preco_unitario: numeric('preco_unitario').notNull(),
    categoria: text('categoria').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const item_produto = pgTable('item_produto', {
    id_item_produto: uuid('id_item_produto').primaryKey(),
    id_ingresso: uuid('id_ingresso')
        .notNull()
        .references(() => ingresso.id_ingresso, { onDelete: 'cascade' }),
    id_produto: uuid('id_produto')
        .notNull()
        .references(() => produto.id_produto, { onDelete: 'cascade' }),
    quantidade: integer('quantidade').notNull(),
    preco_unitario: numeric('preco_unitario').notNull(),
    is_ativo: boolean('is_ativo').notNull()
});

export const ingresso = pgTable('ingresso', {
    id_ingresso: uuid('id_ingresso').primaryKey(),
    id_sessao: uuid('id_sessao')
        .notNull()
        .references(() => sessao.id_sessao, { onDelete: 'cascade' }),
    id_usuario: uuid('id_usuario')
        .notNull()
        .references(() => usuario.id_usuario, { onDelete: 'cascade' }),
    valor: numeric('valor').notNull(),
    id_assento: uuid('id_assento')
        .notNull()
        .references(() => assento.id_assento, { onDelete: 'cascade' }),
    id_tipo: uuid('id_tipo')
        .notNull()
        .references(() => tipo.id_tipo, { onDelete: 'cascade' }),
    is_ativo: boolean('is_ativo').notNull()
});

export const filme = pgTable('filme', {
    id_filme: uuid('id_filme').primaryKey(),
    nome_filme: varchar('nome_filme').notNull(),
    duracao: time('duracao').notNull(),
    sinopse: text('sinopse').notNull(),
    ano_lancamento: integer('ano_lancamento').notNull(),
    classificacao: varchar('classificacao').notNull(),
    foto_capa: varchar('foto_capa').notNull(),
    is_ativo: boolean('is_ativo').notNull()
});

export const genero = pgTable('genero', {
    id_genero: uuid('id_genero').primaryKey(),
    nome_genero: varchar('nome_genero').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const ator = pgTable('ator', {
    id_ator: uuid('id_ator').primaryKey(),
    nome_ator: varchar('nome_ator').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const diretor = pgTable('diretor', {
    id_diretor: uuid('id_diretor').primaryKey(),
    nome_diretor: varchar('nome_diretor').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const genero_do_filme = pgTable('genero_do_filme', {
    id_genero: uuid('id_genero')
        .notNull()
        .references(() => genero.id_genero, { onDelete: 'cascade' }),
    id_filme: uuid('id_filme')
        .notNull()
        .references(() => filme.id_filme, { onDelete: 'cascade' }),
    is_ativo: boolean('is_ativo').notNull(),
}, (table) => ({
    pk: primaryKey(table.id_genero, table.id_filme)
}));

export const ator_do_filme = pgTable('ator_do_filme', {
    id_ator: uuid('id_ator')
        .notNull()
        .references(() => ator.id_ator, { onDelete: 'cascade' }),
    id_filme: uuid('id_filme')
        .notNull()
        .references(() => filme.id_filme, { onDelete: 'cascade' }),
    is_ativo: boolean('is_ativo').notNull(),
}, (table) => ({
    pk: primaryKey(table.id_ator, table.id_filme)
}));

export const diretor_do_filme = pgTable('diretor_do_filme', {
    id_diretor: uuid('id_diretor')
        .notNull()
        .references(() => diretor.id_diretor, { onDelete: 'cascade' }),
    id_filme: uuid('id_filme')
        .notNull()
        .references(() => filme.id_filme, { onDelete: 'cascade' }),
    is_ativo: boolean('is_ativo').notNull(),
}, (table) => ({
    pk: primaryKey(table.id_diretor, table.id_filme)
}));
