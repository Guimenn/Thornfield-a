'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, Calendar, CreditCard, Truck, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import './pedidos.css';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  shipping: number;
  paymentMethod: string;
  date: string;
  status: string;
  shippingAddress: string;
}

export default function PedidosPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se o usuário está logado
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.setItem('returnUrl', '/pages/pedidos');
      router.push('/pages/Login');
      return;
    }

    // Carrega os pedidos do localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      const userOrders = parsedOrders.filter((order: Order) => 
        order.userId === JSON.parse(user).id
      );
      setOrders(userOrders);
    }
    setIsLoading(false);
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500';
      case 'processing':
        return 'text-yellow-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Concluído';
      case 'processing':
        return 'Em Processamento';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle2 size={20} className="text-green-400" />;
      case 'processing':
        return <Package size={20} className="text-amber-400" />;
      case 'cancelled':
        return <XCircle size={20} className="text-red-400" />;
      default:
        return <Package size={20} className="text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-[#0A0501] to-[#1a0f02]">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-amber-600 border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0501] to-[#1a0f02] pt-32 pb-20">
        <div
          className="absolute inset-0 opacity-15 z-0 bg-repeat"
          style={{
            backgroundImage: 'url("/pattern.png")',
            backgroundSize: '200px',
            filter: 'blur(0.5px)'
          }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="mb-4 text-lg uppercase tracking-[0.2em] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent font-medium">
              Meus Pedidos
            </h3>
            <h2 className="font-serif text-5xl font-light text-amber-50 md:text-6xl mb-6">
              Histórico de Compras
            </h2>
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Link
              href="/perfil"
              className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-8"
            >
              <ArrowLeft size={20} />
              <span>Voltar para o perfil</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-black/50 backdrop-blur-md rounded-3xl overflow-hidden border border-amber-600/20 shadow-[0_20px_50px_-12px_rgba(255,191,0,0.2)] p-10 text-center"
            >
              <Package size={48} className="text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-amber-50 mb-2">Nenhum pedido encontrado</h3>
              <p className="text-amber-200/60">Você ainda não fez nenhuma compra em nossa loja.</p>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 mt-6 px-6 py-3 rounded-full bg-amber-900/20 text-amber-400 hover:bg-amber-900/30 transition-all duration-300"
              >
                <span>Ir para a loja</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0501] to-[#1a0f02] pt-32 pb-20">
      <div
        className="absolute inset-0 opacity-15 z-0 bg-repeat"
        style={{
          backgroundImage: 'url("/pattern.png")',
          backgroundSize: '200px',
          filter: 'blur(0.5px)'
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="mb-4 text-lg uppercase tracking-[0.2em] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent font-medium">
            Meus Pedidos
          </h3>
          <h2 className="font-serif text-5xl font-light text-amber-50 md:text-6xl mb-6">
            Histórico de Compras
          </h2>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Link
            href="/pages/perfil"
            className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Voltar para o perfil</span>
          </Link>

          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-black/50 backdrop-blur-md rounded-3xl overflow-hidden border border-amber-600/20 shadow-[0_20px_50px_-12px_rgba(255,191,0,0.2)]"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <span className="text-amber-200/60">|</span>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-amber-400" />
                        <span className="text-amber-200/60">
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard size={16} className="text-amber-400" />
                      <span className="text-amber-200/60">{order.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-amber-900/10 rounded-xl">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-amber-900/20 flex items-center justify-center">
                            <Package size={24} className="text-amber-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-amber-200/60">Quantidade: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-400 font-medium">
                            R$ {item.price.toFixed(2)}
                          </p>
                          <p className="text-amber-200/60">
                            Total: R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-6 border-t border-amber-600/20">
                    <div className="mb-4 md:mb-0">
                      <p className="text-amber-200/60">Endereço de entrega</p>
                      <p className="text-white">{order.shippingAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-200/60">Total do pedido</p>
                      <p className="text-2xl font-serif text-amber-400">
                        R$ {order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 