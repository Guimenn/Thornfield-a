'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Calendar, CreditCard, Truck } from 'lucide-react';
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
}

export default function Orders() {
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

  if (isLoading) {
    return (
      <div className="orders-container">
        <div className="orders-content">
          <h1>Carregando pedidos...</h1>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="orders-content">
          <div className="empty-orders">
            <Package size={48} className="empty-icon" />
            <h2>Nenhum pedido encontrado</h2>
            <p>Você ainda não fez nenhum pedido em nossa loja.</p>
            <button 
              className="continue-shopping"
              onClick={() => router.push('/')}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-content">
        <h1>Meus Pedidos</h1>
        
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <span className="order-id">Pedido #{order.id.slice(-6)}</span>
                  <span className={`order-status ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="order-date">
                  <Calendar size={16} />
                  <span>{formatDate(order.date)}</span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Quantidade: {item.quantity}</p>
                      <p className="item-price">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="payment-info">
                  <CreditCard size={16} />
                  <span>
                    {order.paymentMethod === 'credit' ? 'Cartão de Crédito' : 
                     order.paymentMethod === 'debit' ? 'Cartão de Débito' : 'PIX'}
                  </span>
                </div>
                <div className="shipping-info">
                  <Truck size={16} />
                  <span>Frete: R$ {(order.shipping || 0).toFixed(2)}</span>
                </div>
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 