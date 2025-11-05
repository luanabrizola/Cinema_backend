import 'dotenv/config';
import {defineConfig} from "drizzle-kit"

export default defineConfig({
    dialect: 'postgresql',
    out: './drizzle', // Onde as migrations serão salvas
    schema: './src/infra/db/schema.js', // Onde nosso schema será criado
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});