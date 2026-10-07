import { supabase } from '../lib/supabase-client.js';

export function init() {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Erro no login: ' + error.message);
    } else {
      // Sucesso! O roteador vai nos redirecionar para o dashboard
      window.location.hash = '#/dashboard';
    }
  });
}
