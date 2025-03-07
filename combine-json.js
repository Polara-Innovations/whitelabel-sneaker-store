const fs = require('fs');
const path = require('path');

// Arquivos a serem combinados
const files = [
  './data/layout.json',
  './data/menus.json',
  './data/other.json',
  './data/products.json',
  './data/texts.json',
  './data/themes.json'
];

// Combinar os dados
let combinedData = {};

files.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    combinedData = { ...combinedData, ...data };
  } catch (error) {
    console.error(`Erro ao ler ou analisar ${file}:`, error);
  }
});

// Salvar o resultado
fs.writeFileSync('./data/db.json', JSON.stringify(combinedData, null, 2));
console.log('Arquivos combinados com sucesso em data/db.json');