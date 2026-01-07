// supabase.js - JANGAN declare 'const supabase' lagi karena CDN udah bikin global Supabase

const SUPABASE_URL = 'https://jjikrqzsxppdqbstlnix.supabase.co';  // Ganti dengan URL project Supabase kamu
const SUPABASE_ANON_KEY = 'sb_publishable_SXdQsr44kywQanmaeBN5lQ_Pr3n9Odw';  // Ganti dengan anon public key kamu

// Pakai Supabase yang dari CDN, tapi create client-nya
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Biar kode lain (auth.js, games.js, dll) tetep bisa pake nama 'supabase', kita assign ulang
window.supabase = supabaseClient;

