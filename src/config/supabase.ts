import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT_ANON_KEY, SUPABASE_URL } from './env';

const supabaseUrl: string = SUPABASE_URL as string;
const supabaseKey: string = SUPABASE_CLIENT_ANON_KEY as string;  // O tu API Key privada si es necesario

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
