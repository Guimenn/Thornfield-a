'use client';

import React, { useState } from 'react';
import { Package, Truck, MapPin, Edit2, Save } from 'lucide-react';

interface Address {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento: string;
  numero: string;
}

interface ShippingCalculatorProps {
  onShippingChange: (value: number, address: Address | null) => void;
}

export default function ShippingCalculator({ onShippingChange }: ShippingCalculatorProps) {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState<Address | null>(null);

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
      
      const newAddress: Address = {
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        complemento: '',
        numero: ''
      };
      
      setAddress(newAddress);
      setEditedAddress(newAddress);
      setIsEditing(true); // Inicia em modo de edição quando encontra um endereço
      const shippingValue = calculateShipping(cep);
      onShippingChange(shippingValue, newAddress);
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
      onShippingChange(option.price, address);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('Saving address:', editedAddress);
    if (editedAddress && editedAddress.numero) {
      // Atualiza o endereço local
      setAddress(editedAddress);
      
      // Sai do modo de edição
      setIsEditing(false);
      
      // Envia o endereço para o componente pai
      const currentPrice = shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0;
      console.log('Sending to parent:', currentPrice, editedAddress);
      onShippingChange(currentPrice, editedAddress);
      
      // Limpa qualquer erro anterior
      setError('');
    } else {
      setError('Por favor, preencha o número do endereço');
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedAddress) {
      const updatedAddress = {
        ...editedAddress,
        [e.target.name]: e.target.value
      };
      setEditedAddress(updatedAddress);
      console.log('Address updated:', updatedAddress);
      
      // Auto-save address when numero is filled
      if (e.target.name === 'numero' && e.target.value) {
        const currentPrice = shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0;
        onShippingChange(currentPrice, updatedAddress);
      }
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
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm">Logradouro</label>
                  <input
                    type="text"
                    name="logradouro"
                    value={editedAddress?.logradouro}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 bg-black/30 border border-amber-500/30 rounded-lg text-white text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Número *</label>
                  <input
                    type="text"
                    name="numero"
                    value={editedAddress?.numero}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 bg-black/30 border border-amber-500/30 rounded-lg text-white text-sm"
                    placeholder="Número"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    value={editedAddress?.complemento}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 bg-black/30 border border-amber-500/30 rounded-lg text-white text-sm"
                    placeholder="Complemento (opcional)"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Bairro</label>
                  <input
                    type="text"
                    name="bairro"
                    value={editedAddress?.bairro}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 bg-black/30 border border-amber-500/30 rounded-lg text-white text-sm"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-sm">Cidade</label>
                    <input
                      type="text"
                      name="localidade"
                      value={editedAddress?.localidade}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 bg-black/30 border border-amber-500/30 rounded-lg text-white text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Estado</label>
                    <input
                      type="text"
                      name="uf"
                      value={editedAddress?.uf}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 bg-black/30 border border-amber-500/30 rounded-lg text-white text-sm"
                      readOnly
                    />
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm"
                >
                  <Save size={16} />
                  Salvar Alterações
                </button>
                {error && (
                  <div className="mt-2 text-red-500 text-sm">{error}</div>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white">{address.logradouro}, {address.numero}</p>
                    {address.complemento && <p className="text-gray-400">{address.complemento}</p>}
                    <p className="text-gray-400">{address.bairro}</p>
                    <p className="text-gray-400">{address.localidade} - {address.uf}</p>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="p-2 text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </>
            )}
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