'use client';

import React, { useState } from 'react';
import { Package, Truck, MapPin } from 'lucide-react';

interface ShippingCalculatorProps {
  onShippingChange: (value: number) => void;
}

export default function ShippingCalculator({ onShippingChange }: ShippingCalculatorProps) {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const [shippingOptions, setShippingOptions] = useState([
    {
      id: 'standard',
      name: 'Entrega Padrão',
      price: 15.90,
      estimatedDays: '5-7 dias úteis',
      icon: <Package size={20} className="text-amber-500" />
    },
    {
      id: 'express',
      name: 'Entrega Expressa',
      price: 29.90,
      estimatedDays: '2-3 dias úteis',
      icon: <Truck size={20} className="text-amber-500" />
    }
  ]);

  const calculateShipping = (cep: string) => {
    // Simulação de cálculo de frete baseado no CEP
    // Em um cenário real, isso seria uma chamada à API dos Correios
    const baseValue = 15;
    const lastDigit = parseInt(cep.slice(-1));
    const shippingValue = baseValue + (lastDigit * 2);
    return shippingValue;
  };

  const fetchAddress = async (cep: string) => {
    if (cep.length !== 8) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setError('CEP não encontrado');
        return;
      }
      
      setAddress(data);
      const shippingValue = calculateShipping(cep);
      onShippingChange(shippingValue);
    } catch (err) {
      setError('Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setCep(value);
    
    if (value.length === 8) {
      fetchAddress(value);
    }
  };

  const handleShippingSelect = (type: string) => {
    setSelectedShipping(type);
    const option = shippingOptions.find(opt => opt.id === type);
    if (option) {
      onShippingChange(option.price);
    }
  };

  return (
    <div className="shipping-calculator">
      <div className="cep-input-container">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" size={18} />
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            placeholder="Digite seu CEP"
            maxLength={8}
            className="w-full pl-9 pr-4 py-2 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 transition-all text-sm"
          />
        </div>
        {loading && <div className="text-amber-500 mt-1 text-sm">Calculando frete...</div>}
        {error && <div className="text-red-500 mt-1 text-sm">{error}</div>}
      </div>

      {address && (
        <>
          <div className="address-info">
            <p>{address.logradouro}</p>
            <p>{address.bairro}</p>
            <p>{address.localidade} - {address.uf}</p>
          </div>
          
          <div className="shipping-options mt-4">
            {shippingOptions.map((option) => (
              <div
                key={option.id}
                className={`shipping-option ${selectedShipping === option.id ? 'selected-shipping' : ''}`}
                onClick={() => handleShippingSelect(option.id)}
              >
                <div className="shipping-option-content">
                  <div className="shipping-icon">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-sm">{option.name}</h3>
                    <p className="text-gray-400 text-xs">Prazo estimado: {option.estimatedDays}</p>
                  </div>
                </div>
                <p className="shipping-price text-sm">R$ {option.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 