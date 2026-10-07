import { supabase } from '../lib/supabase-client.js';

let currentMapId = null;

export async function init() {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
  currentMapId = urlParams.get('id');

  if (!currentMapId) {
    alert('Nenhum mapa selecionado!');
    window.location.hash = '#/dashboard';
    return;
  }

  // Carrega os dados do mapa, se existirem
  const { data: mapData, error } = await supabase
    .from('mindmaps')
    .select('data')
    .eq('id', currentMapId)
    .single();

  if (mapData && mapData.data) {
    // Chame a função do SEU código original que renderiza o mapa
    renderMindmap(mapData.data); 
  }

  // Adiciona um listener para salvar o mapa
  document.getElementById('save-btn').addEventListener('click', saveMap);
}

async function saveMap() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  // Capture o estado atual do seu canvas
  const currentMapState = getMapState(); // Função do seu código original

  const { error } = await supabase
    .from('mindmaps')
    .upsert({
      id: currentMapId,
      user_id: userData.user.id,
      title: `Mapa ${new Date().toLocaleDateString()}`, // Você pode pedir um título
      data: currentMapState
    });

  if (error) alert('Erro ao salvar: ' + error.message);
  else alert('Mapa salvo com sucesso!');
}
