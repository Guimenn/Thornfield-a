import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Função para ler o arquivo de usuários
function readUsersFile() {
  const filePath = path.join(process.cwd(), 'app/data/users.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
}

// Função para escrever no arquivo de usuários
function writeUsersFile(data: any) {
  const filePath = path.join(process.cwd(), 'app/data/users.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Endpoint para alterar a senha do usuário logado
 * Esta API permite alterar a senha sem necessidade de reautenticação com Firebase
 * Útil para usuários que foram autenticados localmente
 */
export async function POST(request: Request) {
  try {
    const { uid, currentPassword, newPassword } = await request.json();
    
    if (!uid || !currentPassword || !newPassword) {
      return NextResponse.json({ 
        error: 'UID, senha atual e nova senha são obrigatórios' 
      }, { status: 400 });
    }
    
    const data = readUsersFile();
    
    // Encontra o usuário pelo uid
    const userIndex = data.users.findIndex((u: any) => u.uid === uid);
    
    if (userIndex === -1) {
      return NextResponse.json({ 
        error: 'Usuário não encontrado' 
      }, { status: 404 });
    }
    
    // Verifica se a senha atual está correta
    if (data.users[userIndex].password !== currentPassword) {
      return NextResponse.json({ 
        error: 'Senha atual incorreta' 
      }, { status: 400 });
    }
    
    // Verifica se a nova senha é igual à senha atual
    if (data.users[userIndex].password === newPassword) {
      return NextResponse.json({ 
        error: 'A nova senha não pode ser igual à senha atual' 
      }, { status: 400 });
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
    return NextResponse.json({ 
      error: 'Erro ao atualizar senha do usuário' 
    }, { status: 500 });
  }
}