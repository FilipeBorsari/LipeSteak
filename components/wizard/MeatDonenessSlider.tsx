'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MeatDoneness, MEAT_DONENESS_OPTIONS } from '@/types';
import Card from '../Card';

interface MeatDonenessSliderProps {
  value: MeatDoneness;
  onChange: (value: MeatDoneness) => void;
}

export default function MeatDonenessSlider({ value, onChange }: MeatDonenessSliderProps) {
  // Map slider value (0-3) to doneness
  const donenessMap: MeatDoneness[] = ['mal-passada', 'ao-ponto', 'bem-passada', 'misto'];
  const currentIndex = donenessMap.indexOf(value);
  const currentOption = MEAT_DONENESS_OPTIONS.find(opt => opt.value === value) || MEAT_DONENESS_OPTIONS[1];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    onChange(donenessMap[index]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
          As carnes deverão ter o ponto:
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Arraste o controle para selecionar o ponto desejado
        </p>
      </div>

      {/* Imagem do ponto selecionado */}
      <Card className="overflow-hidden">
        <div className="relative w-full h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={currentOption.image}
            alt={currentOption.label}
            fill
            className="object-contain transition-opacity duration-300"
          />
        </div>
        <div className="text-center">
          <h4 className="font-sans font-bold text-xl text-charcoal mb-1">
            {currentOption.label}
          </h4>
          <p className="text-sm text-gray-600">
            {currentOption.description}
          </p>
        </div>
      </Card>

      {/* Slider */}
      <div className="space-y-3">
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={currentIndex}
          onChange={handleSliderChange}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
          style={{
            background: `linear-gradient(to right, 
              #8B0000 0%, 
              #CD5C5C 33%, 
              #8B4513 66%, 
              #B89B5E 100%)`
          }}
        />
        
        {/* Labels do slider */}
        <div className="flex justify-between text-xs text-gray-600 px-1">
          <span className="text-center" style={{ width: '25%' }}>Mal Passada</span>
          <span className="text-center" style={{ width: '25%' }}>Ao Ponto</span>
          <span className="text-center" style={{ width: '25%' }}>Bem Passada</span>
          <span className="text-center" style={{ width: '25%' }}>Misto</span>
        </div>
      </div>

      {/* Opções clicáveis como alternativa */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {MEAT_DONENESS_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-3 rounded-lg border-2 transition-all text-center ${
              value === option.value
                ? 'border-gold bg-gold/10 shadow-md'
                : 'border-gray-300 hover:border-gold/50'
            }`}
          >
            <div className="font-sans font-semibold text-sm text-charcoal">
              {option.label}
            </div>
          </button>
        ))}
      </div>

      <Card className="bg-gold/10 border border-gold/30">
        <p className="text-sm text-charcoal font-sans">
          💡 <strong>Dica:</strong> Se você não tem certeza ou seus convidados têm preferências variadas, 
          escolha "Misto" e faremos uma variedade de pontos.
        </p>
      </Card>
    </div>
  );
}
