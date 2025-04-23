import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Caminho para o arquivo JSON
    const filePath = path.join(process.cwd(), 'app/data/whiskies.json');
    
    // Lê o arquivo JSON
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parseia o JSON
    const data = JSON.parse(fileContents);
    
    // Retorna os dados como resposta
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados dos whiskies:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados dos whiskies' },
      { status: 500 }
    );
  }
} 