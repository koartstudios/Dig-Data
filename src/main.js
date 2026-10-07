// src/main.js
import { supabase } from './lib/supabase-client.js';

// Função para carregar o conteúdo de uma página
async function loadPage(pageName) {
  const app = document.getElementById('app');
  try {
    // Carrega o HTML da página dinamicamente
    const response = await fetch(`/src/pages/${pageName}.html`);
    if (!response.ok) throw new Error('Página não encontrada');
    app.innerHTML = await response.text();
    
    // Após carregar o HTML, executa o script da página, se houver
    const module = await import(`./pages/${pageName}.js`);
    if (module.init) module.init();
  } catch (error) {
    app.innerHTML = `<h1>Erro 404: Página não encontrada</h1>`;
  }
}

// Roteador simples baseado em hash (#/login, #/dashboard)
function router() {
  const hash = window.location.hash.slice(1) || '/login'; // Padrão é login

  // Verifica se o usuário está logado antes de mostrar páginas privadas
  supabase.auth.getUser().then(({ data: { user } }) => {
    if (!user && hash !== '/login' && hash !== '/register') {
      window.location.hash = '#/login'; // Redireciona para login
      return;
    }
    if (user && (hash === '/login' || hash === '/register')) {
      window.location.hash = '#/dashboard'; // Redireciona para dashboard
      return;
    }

    // Mapeia a rota para o nome do arquivo da página
    const pageMap = {
      '/login': 'login',
      '/register': 'register',
      '/dashboard': 'dashboard',
      '/canvas': 'canvas'
    };
    
    const pageName = pageMap[hash];
    if (pageName) {
      loadPage(pageName);
    } else {
      // Rota não encontrada, redireciona para o padrão
      window.location.hash = '#/login';
    }
  });
}

// Ouve as mudanças na URL
window.addEventListener('hashchange', router);
// Inicia o roteador na primeira carga
window.addEventListener('DOMContentLoaded', router);
