import { NextResponse } from 'next/server';

// Simulação de um banco de dados em memória para desenvolvimento
// Em produção, isso será resetado a cada deploy, então você precisará
// implementar uma solução de banco de dados real como MongoDB, PostgreSQL, etc.
let stockUpdates: Record<string, number> = {};

export async function POST(request: Request) {
  try {
    const { whiskyId, quantityToSubtract } = await request.json();
    console.log('Received request:', { whiskyId, quantityToSubtract });

    // Converte whiskyId para string para garantir comparação consistente
    const idToFind = String(whiskyId);

    // Em um ambiente de produção como o Vercel, não podemos modificar arquivos
    // Precisamos usar um banco de dados ou serviço de armazenamento
    
    // 1. Obter os dados atuais (em produção, isso viria de um banco de dados)
    let response;
    try {
      // Fazemos uma chamada para nossa própria API para obter os dados atuais
      response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/whiskies`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch whiskies data');
      }
    } catch (fetchError) {
      console.error('Error fetching whiskies data:', fetchError);
      return NextResponse.json({ success: false, error: 'Error fetching data' }, { status: 500 });
    }

    const data = await response.json();
    
    const whiskyIndex = data.whiskies.findIndex((w: any) => String(w.id) === idToFind);
    console.log('Whisky index:', whiskyIndex);
    
    if (whiskyIndex === -1) {
      console.error('Whisky not found');
      return NextResponse.json({ success: false, error: 'Whisky not found' }, { status: 404 });
    }

    const currentQuantity = data.whiskies[whiskyIndex].quantity;
    
    // Verificar se temos estoque suficiente
    // Também consideramos atualizações anteriores que ainda não foram persistidas
    const previousUpdates = stockUpdates[idToFind] || 0;
    const effectiveQuantity = currentQuantity - previousUpdates;
    
    if (effectiveQuantity < quantityToSubtract) {
      console.error('Not enough quantity in stock');
      return NextResponse.json({ success: false, error: 'Not enough quantity in stock' }, { status: 400 });
    }

    // Atualizar nosso registro em memória de atualizações de estoque
    stockUpdates[idToFind] = (stockUpdates[idToFind] || 0) + quantityToSubtract;
    
    console.log('Stock updates:', stockUpdates);
    console.log('Updated quantity for whisky', idToFind, 'from', currentQuantity, 'to', currentQuantity - stockUpdates[idToFind]);
    
    // Em um ambiente real, aqui você faria uma chamada para um banco de dados
    // para atualizar permanentemente o estoque
    
    return NextResponse.json({ 
      success: true,
      message: 'Stock updated successfully in memory',
      newQuantity: effectiveQuantity - quantityToSubtract
    });
  } catch (error) {
    console.error('Error updating whisky quantity:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Adicionar um endpoint GET para depuração (remover em produção)
export async function GET() {
  return NextResponse.json({ stockUpdates });
}