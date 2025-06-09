import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // 🔐 S3 / MinIO / Cloudflare R2
  S3_ENDPOINT: z.string().url(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_BUCKET: z.string(),
  S3_REGION: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables.");
}

export default _env.data;