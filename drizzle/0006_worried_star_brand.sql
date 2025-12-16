CREATE TABLE "ingresso" (
	"id_ingresso" uuid PRIMARY KEY NOT NULL,
	"id_sessao" uuid NOT NULL,
	"id_usuario" uuid NOT NULL,
	"valor" numeric NOT NULL,
	"id_assento" uuid NOT NULL,
	"id_tipo" uuid NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_produto" (
	"id_item_produto" uuid PRIMARY KEY NOT NULL,
	"id_ingresso" uuid NOT NULL,
	"id_produto" uuid NOT NULL,
	"quantidade" integer NOT NULL,
	"preco_unitario" numeric NOT NULL,
	"is_ativo" boolean NOT NULL,
	"id_pedido" uuid
);
--> statement-breakpoint
CREATE TABLE "produto" (
	"id_produto" uuid PRIMARY KEY NOT NULL,
	"nome_produto" varchar NOT NULL,
	"preco_unitario" numeric NOT NULL,
	"categoria" text NOT NULL,
	"is_ativo" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ingresso" ADD CONSTRAINT "ingresso_id_sessao_sessao_id_sessao_fk" FOREIGN KEY ("id_sessao") REFERENCES "public"."sessao"("id_sessao") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingresso" ADD CONSTRAINT "ingresso_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingresso" ADD CONSTRAINT "ingresso_id_assento_assento_id_assento_fk" FOREIGN KEY ("id_assento") REFERENCES "public"."assento"("id_assento") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingresso" ADD CONSTRAINT "ingresso_id_tipo_tipo_id_tipo_fk" FOREIGN KEY ("id_tipo") REFERENCES "public"."tipo"("id_tipo") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_produto" ADD CONSTRAINT "item_produto_id_ingresso_ingresso_id_ingresso_fk" FOREIGN KEY ("id_ingresso") REFERENCES "public"."ingresso"("id_ingresso") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_produto" ADD CONSTRAINT "item_produto_id_produto_produto_id_produto_fk" FOREIGN KEY ("id_produto") REFERENCES "public"."produto"("id_produto") ON DELETE cascade ON UPDATE no action;