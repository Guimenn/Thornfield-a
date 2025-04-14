import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app/data/users.json');

// Função para garantir que o arquivo users.json existe
const ensureFileExists = () => {
  const dirPath = path.dirname(filePath);
  
  // Verifica se o diretório existe, se não, cria
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Verifica se o arquivo existe, se não, cria com estrutura inicial
  if (!fs.existsSync(filePath)) {
    const initialData = {
      users: []
    };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
  }
};

// Replace any types with more specific types
// For example:
interface UserData {
  name: string;
  email: string;
  // other properties
}

// Use proper typing for request/response
export async function POST(request: Request) {
  try {
    // Garante que o arquivo existe
    ensureFileExists();
    
    const userData = await request.json();
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Verifica se o usuário já existe
    const userIndex = data.users.findIndex((u: any) => u.uid === userData.uid);
    
    if (userIndex === -1) {
      // Adiciona novo usuário
      data.users.push({
        ...userData,
        createdAt: new Date().toISOString()
      });
    } else {
      // Atualiza usuário existente
      data.users[userIndex] = {
        ...data.users[userIndex],
        ...userData,
        lastLogin: new Date().toISOString()
      };
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
    return NextResponse.json({ error: 'Erro ao salvar dados do usuário' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // Garante que o arquivo existe
    ensureFileExists();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    if (email) {
      // Se um email foi fornecido, retorna apenas esse usuário
      const user = data.users.find((u: any) => u.email === email);
      return NextResponse.json(user || null);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao ler dados dos usuários:', error);
    return NextResponse.json({ error: 'Erro ao ler dados dos usuários' }, { status: 500 });
  }
}