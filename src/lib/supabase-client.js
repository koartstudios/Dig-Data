import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Substitua pelas suas credenciais do Supabase
const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseKey = 'SUA_CHAVE_ANONIMA';

export const supabase = createClient(supabaseUrl, supabaseKey);
