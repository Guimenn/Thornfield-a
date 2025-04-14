'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import './checkout.css';
import { Package, CreditCard, ArrowLeft, Truck } from 'lucide-react';
import ShippingCalculator from '../../Components/ShippingCalculator/ShippingCalculator';

export default function Checkout() {
  const router = useRouter();
  const { items, total } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [shipping, setShipping] = useState(0);

  const handleShippingChange = (value: number) => {
    setShipping(value);
  };

  const handleCheckout = async () => {
    // Verifica se o usuário está logado
    const user = localStorage.getItem('user');
    if (!user) {
      // Salva a URL atual para redirecionar após o login
      localStorage.setItem('returnUrl', '/pages/checkout');
      router.push('/pages/Login');
      return;
    }

    setIsLoading(true);
    try {
      // Salva o valor do frete no localStorage
      localStorage.setItem('shipping', shipping.toString());
      
      // Aqui você implementaria a integração com o gateway de pagamento
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação de processamento
      router.push('/pages/payment');
    } catch (error) {
      console.error('Erro no checkout:', error);
      setIsLoading(false);
    }
  };

  const finalTotal = total + shipping;

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h1>Finalizar Compra</h1>
        
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <Package size={48} className="text-amber-500" />
              <p className="text-center text-gray-400">Seu carrinho está vazio</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item-hover">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Quantidade: {item.quantity}</p>
                  <p className="item-price">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="shipping-section">
          <h3>Calcular Frete</h3>
          <ShippingCalculator onShippingChange={handleShippingChange} />
        </div>

        <div className="total-section">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="shipping-cost">
            <span>Frete:</span>
            <span>R$ {shipping.toFixed(2)}</span>
          </div>
          <div className="total-amount">
            <span>Total:</span>
            <span>R$ {finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="button-group">
          <button 
            className="back-button"
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Processando...</span>
            ) : (
              <>
                <CreditCard size={20} />
                <span>Finalizar Compra</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 