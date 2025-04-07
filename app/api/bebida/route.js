import { NextResponse } from 'next/server';
import { pesquisarBebidas, obterBebidaPorId } from './bebidas';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const id = searchParams.get('id');
  
  if (id) {
    const bebida = obterBebidaPorId(id);
    if (!bebida) {
      return NextResponse.json({ error: 'Bebida não encontrada' }, { status: 404 });
    }
    return NextResponse.json(bebida);
  }
  
  const resultados = pesquisarBebidas(query);
  return NextResponse.json(resultados);
}