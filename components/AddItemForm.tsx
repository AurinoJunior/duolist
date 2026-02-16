'use client';

import { useState } from 'react';
import { Category } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface AddItemFormProps {
  onAdd: (name: string, category: Category) => void;
}

/**
 * Formulário para adicionar novos itens
 * Inclui input de nome e seletor de categoria
 */
export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('outros');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAdd(itemName.trim(), selectedCategory);
      setItemName('');
      setSelectedCategory('outros');
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="add-button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="
              w-full py-4 px-6 rounded-2xl
              bg-gradient-to-r from-orange-400 to-peach-400
              text-white font-medium
              flex items-center justify-center gap-2
              hover:shadow-lg hover:scale-[1.02]
              transition-all duration-200
            "
          >
            <Plus size={20} />
            Adicionar Item
          </motion.button>
        ) : (
          <motion.form
            key="add-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-4"
          >
            {/* Input Nome */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nome do item
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Ex: Maçã, Leite, Detergente..."
                autoFocus
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-neutral-200
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                  outline-none transition-all
                  text-neutral-800 placeholder-neutral-400
                "
              />
            </div>

            {/* Seletor de Categoria */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Categoria
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setSelectedCategory(category.value)}
                    className={`
                      px-3 py-2.5 rounded-xl
                      border-2 transition-all duration-200
                      flex flex-col items-center gap-1
                      ${selectedCategory === category.value
                        ? 'border-current shadow-sm scale-105'
                        : 'border-neutral-200 hover:border-neutral-300'
                      }
                    `}
                    style={{
                      color: selectedCategory === category.value ? category.color : '#6B6B6B',
                    }}
                  >
                    <span className="text-2xl">{category.emoji}</span>
                    <span className="text-xs font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setItemName('');
                  setSelectedCategory('outros');
                }}
                className="
                  flex-1 py-3 px-4 rounded-xl
                  border border-neutral-200
                  text-neutral-600 font-medium
                  hover:bg-neutral-50
                  transition-all duration-200
                  flex items-center justify-center gap-2
                "
              >
                <X size={16} />
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!itemName.trim()}
                className="
                  flex-1 py-3 px-4 rounded-xl
                  bg-gradient-to-r from-orange-400 to-peach-400
                  text-white font-medium
                  hover:shadow-md hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:hover:scale-100 disabled:hover:shadow-none
                  transition-all duration-200
                  flex items-center justify-center gap-2
                "
              >
                <Plus size={16} />
                Adicionar
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
