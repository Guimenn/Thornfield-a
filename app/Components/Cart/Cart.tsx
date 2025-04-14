import React from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import './Cart.css';

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Seu carrinho está vazio</h2>
          <button 
            className="continue-shopping"
            onClick={() => router.push('/products')}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Seu Carrinho</h1>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">R$ {item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            <button 
              onClick={() => removeItem(item.id)}
              className="remove-item"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Frete:</span>
          <span>Grátis</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <button 
          className="checkout-button"
          onClick={() => router.push('/checkout')}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
} 