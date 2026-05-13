import pg from "pg";

const { Pool } = pg;

const isSupabase =
  process.env.DATABASE_URL?.includes("supabase") ||
  process.env.DB_HOST?.includes("supabase");

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: isSupabase
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

console.log("Pool PostgreSQL conectado!");

export default connection;
