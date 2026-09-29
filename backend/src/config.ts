import { z } from "zod";
const schema=z.object({PORT:z.coerce.number().default(4000),DATABASE_URL:z.string().default("postgres://localhost/gigflow"),JWT_SECRET:z.string().min(16).default("development-only-change-me"),CORS_ORIGIN:z.string().default("http://localhost:5173"),GOOGLE_CLIENT_ID:z.string().optional()});
export const config=schema.parse(process.env);
