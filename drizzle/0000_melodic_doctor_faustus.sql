CREATE TABLE "assento" (
	"id_assento" uuid PRIMARY KEY NOT NULL,
	"fila" varchar NOT NULL,
	"numero" integer NOT NULL,
	"is_ativo" boolean NOT NULL,
	"id_sala" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ator" (
	"id_ator" uuid PRIMARY KEY NOT NULL,
	"nome_ator" varchar NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ator_do_filme" (
	"id_ator" uuid NOT NULL,
	"id_filme" uuid NOT NULL,
	"is_ativo" boolean NOT NULL,
	CONSTRAINT "ator_do_filme_id_ator_id_filme_pk" PRIMARY KEY("id_ator","id_filme")
);
--> statement-breakpoint
CREATE TABLE "diretor" (
	"id_diretor" uuid PRIMARY KEY NOT NULL,
	"nome_diretor" varchar NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diretor_do_filme" (
	"id_diretor" uuid NOT NULL,
	"id_filme" uuid NOT NULL,
	"is_ativo" boolean NOT NULL,
	CONSTRAINT "diretor_do_filme_id_diretor_id_filme_pk" PRIMARY KEY("id_diretor","id_filme")
);
--> statement-breakpoint
CREATE TABLE "filme" (
	"id_filme" uuid PRIMARY KEY NOT NULL,
	"nome_filme" varchar NOT NULL,
	"duracao" time NOT NULL,
	"sinopse" text NOT NULL,
	"ano_lancamento" integer NOT NULL,
	"classificacao" varchar NOT NULL,
	"foto_capa" varchar NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genero" (
	"id_genero" uuid PRIMARY KEY NOT NULL,
	"nome_genero" varchar NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genero_do_filme" (
	"id_genero" uuid NOT NULL,
	"id_filme" uuid NOT NULL,
	"is_ativo" boolean NOT NULL,
	CONSTRAINT "genero_do_filme_id_genero_id_filme_pk" PRIMARY KEY("id_genero","id_filme")
);
--> statement-breakpoint
CREATE TABLE "item_pedido" (
	"id_item_pedido" uuid PRIMARY KEY NOT NULL,
	"nome_item_pedido" varchar NOT NULL,
	"categoria" text NOT NULL,
	"quantidade" integer NOT NULL,
	"preco_unitario" numeric NOT NULL,
	"preco_subtotal" numeric NOT NULL,
	"is_ativo" boolean NOT NULL,
	"id_pedido" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pedido" (
	"id_pedido" uuid PRIMARY KEY NOT NULL,
	"preco_total" numeric NOT NULL,
	"forma_pagamento" text NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sala" (
	"id_sala" uuid PRIMARY KEY NOT NULL,
	"nome_sala" varchar NOT NULL,
	"capacidade" integer NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tipo" (
	"id_tipo" uuid PRIMARY KEY NOT NULL,
	"nome_tipo" varchar NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuario" (
	"id_usuario" uuid PRIMARY KEY NOT NULL,
	"nome_usuario" varchar NOT NULL,
	"tipo" text NOT NULL,
	"cpf" varchar(14) NOT NULL,
	"data_nascimento" date NOT NULL,
	"telefone" varchar(12),
	"email" text NOT NULL,
	"senha" varchar(20),
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assento" ADD CONSTRAINT "assento_id_sala_sala_id_sala_fk" FOREIGN KEY ("id_sala") REFERENCES "public"."sala"("id_sala") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ator_do_filme" ADD CONSTRAINT "ator_do_filme_id_ator_ator_id_ator_fk" FOREIGN KEY ("id_ator") REFERENCES "public"."ator"("id_ator") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ator_do_filme" ADD CONSTRAINT "ator_do_filme_id_filme_filme_id_filme_fk" FOREIGN KEY ("id_filme") REFERENCES "public"."filme"("id_filme") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diretor_do_filme" ADD CONSTRAINT "diretor_do_filme_id_diretor_diretor_id_diretor_fk" FOREIGN KEY ("id_diretor") REFERENCES "public"."diretor"("id_diretor") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diretor_do_filme" ADD CONSTRAINT "diretor_do_filme_id_filme_filme_id_filme_fk" FOREIGN KEY ("id_filme") REFERENCES "public"."filme"("id_filme") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genero_do_filme" ADD CONSTRAINT "genero_do_filme_id_genero_genero_id_genero_fk" FOREIGN KEY ("id_genero") REFERENCES "public"."genero"("id_genero") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genero_do_filme" ADD CONSTRAINT "genero_do_filme_id_filme_filme_id_filme_fk" FOREIGN KEY ("id_filme") REFERENCES "public"."filme"("id_filme") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_pedido_pedido_id_pedido_fk" FOREIGN KEY ("id_pedido") REFERENCES "public"."pedido"("id_pedido") ON DELETE cascade ON UPDATE no action;