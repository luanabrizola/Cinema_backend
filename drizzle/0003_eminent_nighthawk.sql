CREATE TABLE "sessao" (
	"id_sessao" uuid PRIMARY KEY NOT NULL,
	"idioma" varchar NOT NULL,
	"dimensao" varchar NOT NULL,
	"data" date NOT NULL,
	"horario" time NOT NULL,
	"id_sala" uuid NOT NULL,
	"id_filme" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessao" ADD CONSTRAINT "sessao_id_sala_sala_id_sala_fk" FOREIGN KEY ("id_sala") REFERENCES "public"."sala"("id_sala") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessao" ADD CONSTRAINT "sessao_id_filme_filme_id_filme_fk" FOREIGN KEY ("id_filme") REFERENCES "public"."filme"("id_filme") ON DELETE cascade ON UPDATE no action;