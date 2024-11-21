import { SUPABASE_DB_NAME, SUPABASE_HOST, SUPABASE_PASSWORD, SUPABASE_PORT, SUPABASE_USER } from "./env";
import { Client  } from "pg";

// Configura la conexión con los detalles de tu base de datos Supabase
const client = new Client ({
  user: SUPABASE_USER,        // usuario de la base de datos
  host: SUPABASE_HOST, // ejemplo: 'db.supabase.co'
  database: SUPABASE_DB_NAME,   // nombre de la base de datos
  password: SUPABASE_PASSWORD,   // contraseña de la base de datos
  port: Number(SUPABASE_PORT),                 // Puerto por defecto para PostgreSQL
  ssl: { rejectUnauthorized: false }
});

export default client
