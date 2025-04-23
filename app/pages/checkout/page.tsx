'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import './checkout.css';
import { Package, CreditCard, ArrowLeft, Truck, AlertCircle } from 'lucide-react';
import ShippingCalculator from '../../Components/ShippingCalculator/ShippingCalculator';

interface Address {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento: string;
  numero: string;
}

export default function Checkout() {
  const router = useRouter();
  const { items, total } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [shipping, setShipping] = useState(0);
  const [address, setAddress] = useState<Address | null>(null);
  const [addressError, setAddressError] = useState('');

  const handleShippingChange = (value: number, addressData: Address | null) => {
    console.log('Address data received:', addressData);
    setShipping(value);
    setAddress(addressData);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
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

    // Verifica se o endereço foi preenchido
    console.log('Current address state:', address);
    if (!address || !address.numero) {
      setAddressError('Por favor, preencha o endereço de entrega completo');
      return;
    }

    setAddressError('');
    setIsLoading(true);
    try {
      // Salva o valor do frete no localStorage
      localStorage.setItem('shipping', shipping.toString());
      
      // Salva o endereço no localStorage
      localStorage.setItem('deliveryAddress', JSON.stringify(address));
      
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
      <div className="checkout-content mt-[100px]">
        <h1>Finalizar Compra</h1>
        
        {items.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: 'rgba(26, 26, 26, 0.5)',
            borderRadius: '1rem',
            margin: '2rem 0',
            minHeight: '300px',
            border: '1px solid rgba(245, 158, 11, 0.1)'
          }}>
            <Package size={64} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#f8fafc' }}>Seu carrinho está vazio</h2>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>Você ainda não adicionou nenhum produto ao carrinho.</p>
            <button 
              onClick={() => router.push('/')}
              className="checkout-button"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ArrowLeft size={20} />
              <span>Voltar para a página inicial</span>
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item-hover">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Quantidade: {item.quantity}</p>
                    <p className="item-price">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="shipping-section">
              <h3>Calcular Frete</h3>
              <ShippingCalculator onShippingChange={handleShippingChange} />
              {addressError && (
                <div className="address-error">
                  <AlertCircle size={16} className="text-red-500" />
                  <span className="text-red-500 text-sm">{addressError}</span>
                </div>
              )}
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
          </>
        )}
      </div>
    </div>
  );
} 