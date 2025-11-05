import { pgTable, uuid, text, varchar, boolean, date, numeric, time, integer, primaryKey } from 'drizzle-orm/pg-core';

export const sala = pgTable('sala', {
    id_sala: uuid('id_sala').primaryKey(),
    nome_sala: varchar('nome_sala').notNull(),
    capacidade: integer('capacidade').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const assento = pgTable('assento', {
    id_assento: uuid('id_assento').primaryKey(),
    fila: varchar('fila').notNull(),
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
    cpf: varchar('cpf', {length: 14}).notNull(),
    data_nascimento: date('data_nascimento').notNull(),
    telefone: varchar('telefone', {length: 12}),
    email: text('email').notNull(),
    senha: varchar('senha', {length: 20}),
    is_ativo: boolean('is_ativo').notNull(),
});

export const tipo = pgTable('tipo', {
    id_tipo: uuid('id_tipo').primaryKey(),
    nome_tipo: varchar('nome_tipo').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const pedido = pgTable('pedido', {
    id_pedido: uuid('id_pedido').primaryKey(),
    preco_total: numeric('preco_total').notNull(),
    forma_pagamento: text('forma_pagamento').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
});

export const item_pedido = pgTable('item_pedido', {
    id_item_pedido: uuid('id_item_pedido').primaryKey(),
    nome_item_pedido: varchar('nome_item_pedido').notNull(),
    categoria: text('categoria').notNull(),
    quantidade: integer('quantidade').notNull(),
    preco_unitario: numeric('preco_unitario').notNull(),
    preco_subtotal: numeric('preco_subtotal').notNull(),
    is_ativo: boolean('is_ativo').notNull(),
    id_pedido: uuid('id_pedido')
        .notNull()
        .references(() => pedido.id_pedido, { onDelete: 'cascade' })
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
