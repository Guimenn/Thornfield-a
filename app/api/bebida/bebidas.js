import Fuse from 'fuse.js'
import fs from 'fs'
import path from 'path'

// Cache para armazenar os dados e evitar leituras repetidas do arquivo
let bebidasCache = null;
let fuseInstance = null;

// Função para carregar os dados do arquivo JSON com cache
export function carregarBebidas() {
  if (bebidasCache) {
    return bebidasCache;
  }
  
  try {
    const filePath = path.join(process.cwd(), 'app/api/bebida/api/bebidas.json');
    const data = fs.readFileSync(filePath, 'utf8');
    bebidasCache = JSON.parse(data);
    return bebidasCache;
  } catch (error) {
    console.error('Erro ao carregar bebidas:', error);
    bebidasCache = [];
    return [];
  }
}

// Configuração do Fuse.js para pesquisa
const options = {
  keys: ['name', 'description'],
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true
};

// Função para obter a instância do Fuse (com cache)
function getFuseInstance() {
  if (!fuseInstance) {
    const bebidas = carregarBebidas();
    fuseInstance = new Fuse(bebidas, options);
  }
  return fuseInstance;
}

// Função para pesquisar bebidas
export function pesquisarBebidas(query) {
  if (!query || query.trim() === '') {
    return carregarBebidas().slice(0, 10); // Limita o retorno quando não há query
  }
  
  const fuse = getFuseInstance();
  const resultado = fuse.search(query);
  
  // Limita o número de resultados para melhorar a performance
  return resultado.slice(0, 20).map(item => item.item);
}

// Função para obter uma bebida por ID
export function obterBebidaPorId(id) {
  const bebidas = carregarBebidas();
  return bebidas.find(bebida => bebida.id === parseInt(id));
}

