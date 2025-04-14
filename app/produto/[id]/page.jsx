'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Button from '../../Components/Ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, Share2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';

export default function ProdutoPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

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

  const handleAddToCart = () => {
    if (!produto) return;

    // Verifica se há estoque suficiente
    if (produto.quantity < quantity) {
      toast.error('Quantidade indisponível em estoque');
      return;
    }

    // Adiciona o item ao carrinho
    addItem({
      id: produto.id,
      name: produto.name,
      price: produto.price,
      quantity: quantity,
      image: produto.image
    });

    // Mostra notificação de sucesso
    toast.success(`${quantity} ${quantity === 1 ? 'unidade' : 'unidades'} de ${produto.name} adicionada${quantity === 1 ? '' : 's'} ao carrinho`);
  };

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-black to-amber-900/5"
    >
    
      {/* Conteúdo Principal */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Imagem Principal */}
              <motion.div 
                className="relative aspect-square bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {produto.image ? (
                  <motion.img 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    src={produto.image} 
                    alt={produto.name} 
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-b from-amber-900/20 to-black/20 flex items-center justify-center">
                    <span className="text-amber-600 text-xl">Imagem não disponível</span>
                  </div>
                )}
              </motion.div>

              {/* Miniaturas */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer border ${
                      selectedImage === index ? 'border-amber-600' : 'border-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white/40 text-sm">{index + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Informações do Produto */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-5xl font-light mb-2 tracking-wider">{produto.name}</h1>
                <p className="text-4xl text-amber-600 mb-6 font-light">R$ {produto.price.toFixed(2)}</p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-light tracking-wider">Descrição</h2>
                <p className="text-white/80 leading-relaxed tracking-wider">{produto.description}</p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-light tracking-wider">Detalhes</h2>
                <div className="grid grid-cols-2 gap-4 text-white/60">
                  <div>
                    <p className="text-sm tracking-wider">Disponibilidade</p>
                    <p className="text-lg font-light">
                      {produto.quantity > 0 ? 'Em estoque' : 'Esgotado'}
                    </p>
                  </div>
                  {produto.quantity > 0 && (
                    <div>
                      <p className="text-sm tracking-wider">Quantidade</p>
                      <p className="text-lg font-light">
                        {produto.quantity} unidades
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Seletor de Quantidade */}
              <div className="flex items-center space-x-4">
                <p className="text-white/60 tracking-wider">Quantidade:</p>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    className="w-10 h-10 p-0 flex items-center justify-center"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    className="w-10 h-10 p-0 flex items-center justify-center"
                    onClick={() => setQuantity(Math.min(produto.quantity, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* Botões de Ação */}
              <div className="flex flex-col space-y-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="primary" 
                    className="w-full py-4 text-lg flex items-center justify-center"
                    onClick={handleAddToCart}
                    disabled={produto.quantity === 0}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {produto.quantity === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full py-4 text-lg"
                    disabled={produto.quantity === 0}
                  >
                    Comprar Agora
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}