'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock, CheckCircle2, Wallet, QrCode, Package, ShoppingCart } from 'lucide-react';
import CreditCardComponent from '../../Components/Payment/CreditCard/CreditCard';
import PixPayment from '../../Components/Payment/PixPayment/PixPayment';
import { useCart } from '../../context/CartContext';
import './payment.css';

const Payment = () => {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [shipping, setShipping] = useState(0);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    // Verifica se o usuário está logado
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.setItem('returnUrl', '/pages/payment');
      router.push('/pages/Login');
      return;
    }

    // Verifica se o carrinho está vazio
    if (items.length === 0) {
      router.push('/');
      return;
    }

    // Recupera o valor do frete do localStorage
    const savedShipping = localStorage.getItem('shipping');
    if (savedShipping) {
      setShipping(parseFloat(savedShipping));
    }
  }, [router, items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatação do número do cartão
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
    }
    // Formatação da data de expiração
    else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    }
    // Formatação do CVV
    else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const saveOrder = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const order = {
      id: Date.now().toString(),
      userId: user.id,
      items: items,
      total: total + shipping,
      shipping: shipping,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
      status: 'completed'
    };

    // Salva o pedido no localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simula processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      handlePaymentSuccess();
    } catch (error) {
      console.error('Erro no pagamento:', error);
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    // Salva o pedido
    saveOrder();

    // Atualiza o estado de sucesso
    setPaymentSuccess(true);

    // Redireciona após 3 segundos e limpa o carrinho
    setTimeout(() => {
      clearCart();
      router.push('/');
    }, 3000);
  };

  const handleCvvFocus = () => {
    setIsCardFlipped(true);
  };

  const handleCvvBlur = () => {
    setIsCardFlipped(false);
  };

  if (items.length === 0) {
    return (
      <div className="payment-container">
        <div className="payment-content">
          <div className="payment-header">
            <ShoppingCart size={24} className="payment-icon" />
            <h1>Carrinho Vazio</h1>
          </div>
          <div className="empty-cart-message">
            <p>Seu carrinho está vazio. Adicione produtos antes de prosseguir para o pagamento.</p>
            <button
              className="payment-button"
              onClick={() => router.push('/pages/produtos')}
            >
              Voltar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="payment-container">
        <div className="payment-content success">
          <CheckCircle2 size={64} className="success-icon animate-pulse flex justify-center mx-auto" />
          <h1>Pagamento Realizado com Sucesso!</h1>
          <p>Seu pedido foi confirmado e está sendo processado.</p>
          <p className="redirect-message">Redirecionando para a página inicial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-content">
        <div className="payment-header">
          <CreditCard size={24} className="payment-icon" />
          <h1>Pagamento</h1>
        </div>

        <div className="order-summary">
          <div className="summary-header">
            <Package size={20} />
            <h2>Resumo do Pedido</h2>
          </div>

          <div className="order-items">
            {items.map(item => (
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

          <div className="order-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Frete:</span>
              <span>R$ {shipping.toFixed(2)}</span>
            </div>
            <div className="total-row final">
              <span>Total:</span>
              <span>R$ {(total + shipping).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="payment-methods">
          <div
            className={`payment-method ${paymentMethod === 'credit' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange('credit')}
          >
            <CreditCard size={20} />
            <span>Cartão de Crédito</span>
          </div>
          <div
            className={`payment-method ${paymentMethod === 'debit' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange('debit')}
          >
            <Wallet size={20} />
            <span>Cartão de Débito</span>
          </div>
          <div
            className={`payment-method ${paymentMethod === 'pix' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange('pix')}
          >
            <QrCode size={20} />
            <span>PIX</span>
          </div>
        </div>

        {paymentMethod === 'pix' ? (
          <PixPayment value={total + shipping} onSuccess={handlePaymentSuccess} />
        ) : (
          <>
            <CreditCardComponent
              cardNumber={formData.cardNumber}
              cardName={formData.cardName}
              expiry={formData.expiry}
              cvv={formData.cvv}
              isFlipped={isCardFlipped}
            />

            <form onSubmit={handleSubmit} className="payment-form">
              <div className="form-group">
                <label htmlFor="cardNumber">Número do Cartão</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Nome no Cartão</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="Nome como está no cartão"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Data de Expiração</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    onFocus={handleCvvFocus}
                    onBlur={handleCvvBlur}
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <div className="security-info">
                <Lock size={16} />
                <span>Pagamento 100% Seguro</span>
              </div>

              <button
                type="submit"
                className="payment-button"
                disabled={isLoading}
              >
                {isLoading ? 'Processando...' : 'Confirmar Pagamento'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment; 