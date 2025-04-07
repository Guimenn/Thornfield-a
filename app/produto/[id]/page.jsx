'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Button from '../../Components/Ui/Button';

export default function ProdutoPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await fetch(`/api/bebida?id=${id}`);
        if (!response.ok) throw new Error('Produto não encontrado');
        const data = await response.json();
        setProduto(data);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduto();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-amber-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Produto não encontrado</h2>
          <Button href="/">Voltar para a página inicial</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/5 p-8 rounded-lg flex items-center justify-center">
            {produto.image ? (
              <img 
                src={produto.image} 
                alt={produto.name} 
                className="max-h-[500px] object-contain"
              />
            ) : (
              <div className="h-[500px] w-full bg-gradient-to-b from-amber-900/20 to-black/20 flex items-center justify-center">
                <span className="text-amber-600 text-xl">Imagem não disponível</span>
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-4xl font-light mb-2">{produto.name}</h1>
            <p className="text-3xl text-amber-600 mb-6">R$ {produto.price.toFixed(2)}</p>
            
            <div className="mb-8">
              <h2 className="text-xl mb-2 font-light">Descrição</h2>
              <p className="text-white/80 leading-relaxed">{produto.description}</p>
            </div>
            
            <div className="mb-8">
              <p className="text-white/60 mb-2">
                Disponibilidade: {produto.quantity > 0 ? 'Em estoque' : 'Esgotado'}
              </p>
              {produto.quantity > 0 && (
                <p className="text-white/60">
                  {produto.quantity} unidades disponíveis
                </p>
              )}
            </div>
            
            <div className="flex space-x-4">
              <Button variant="primary">Adicionar ao Carrinho</Button>
              <Button variant="outline">Comprar Agora</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}