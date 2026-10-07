import { supabase } from '../lib/supabase-client.js';

export async function init() {
  // Botão de Sair
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.hash = '#/login';
  });

  // Botão de Novo Mapa
  document.getElementById('new-map-btn').addEventListener('click', () => {
    // Gera um ID único para o novo mapa e navega para o canvas
    const newMapId = crypto.randomUUID();
    window.location.hash = `#/canvas?id=${newMapId}`;
  });

  // Carrega a lista de mapas do usuário
  const { data: maps, error } = await supabase
    .from('mindmaps')
    .select('id, title');
  
  if (error) {
    console.error('Erro ao carregar mapas:', error);
    return;
  }

  const mapsList = document.getElementById('maps-list');
  maps.forEach(map => {
    const link = document.createElement('a');
    link.href = `#/canvas?id=${map.id}`;
    link.textContent = map.title;
    link.className = 'map-item';
    mapsList.appendChild(link);
  });
}
