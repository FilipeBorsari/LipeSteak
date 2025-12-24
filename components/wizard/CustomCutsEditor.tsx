'use client';

import { useState } from 'react';
import { CustomCutItem, AVAILABLE_CUTS } from '@/types';
import Button from '../Button';
import Card from '../Card';

interface CustomCutsEditorProps {
  items: CustomCutItem[];
  onChange: (items: CustomCutItem[]) => void;
}

export default function CustomCutsEditor({ items, onChange }: CustomCutsEditorProps) {
  const addItem = () => {
    const newItem: CustomCutItem = {
      id: Date.now().toString(),
      type: '',
      quantity: 0,
      unit: 'kg',
    };
    onChange([...items, newItem]);
  };
  
  const removeItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };
  
  const updateItem = (id: string, field: keyof CustomCutItem, value: any) => {
    onChange(
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-sans font-semibold text-lg">Personalize seus cortes</h3>
        <Button onClick={addItem} size="sm" variant="secondary">
          + Adicionar Item
        </Button>
      </div>
      
      {items.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-gray-600 font-sans">
            Clique em "Adicionar Item" para começar a personalizar seus cortes.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-charcoal">
                    Tipo de Corte
                  </label>
                  <select
                    value={item.type}
                    onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Selecione...</option>
                    {AVAILABLE_CUTS.map((cut) => (
                      <option key={cut.value} value={cut.value}>
                        {cut.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-charcoal">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={item.quantity || ''}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-charcoal">
                    Unidade
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={item.unit}
                      onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="kg">Kg</option>
                      <option value="unidades">Unidades</option>
                    </select>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      aria-label="Remover item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
