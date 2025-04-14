import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app/data/users.json');

// Função para ler o arquivo JSON
const readUsersFile = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [] };
  }
};

// Função para escrever no arquivo JSON
const writeUsersFile = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// POST /api/users/reset-password - Atualiza a senha do usuário
export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();
    
    if (!email || !newPassword) {
      return NextResponse.json({ error: 'Email e nova senha são obrigatórios' }, { status: 400 });
    }
    
    const data = readUsersFile();
    
    // Encontra o usuário pelo email
    const userIndex = data.users.findIndex((u: any) => u.email === email);
    
    if (userIndex === -1) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    
    // Verifica se a nova senha é igual à senha atual
    if (data.users[userIndex].password === newPassword) {
      return NextResponse.json({ error: 'A nova senha não pode ser igual à senha atual' }, { status: 400 });
    }
    
    // Atualiza a senha do usuário
    data.users[userIndex].password = newPassword;
    
    // Adiciona data de atualização
    data.users[userIndex].passwordUpdatedAt = new Date().toISOString();
    
    // Salva as alterações
    writeUsersFile(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar senha do usuário:', error);
    return NextResponse.json({ error: 'Erro ao atualizar senha do usuário' }, { status: 500 });
  }
} 