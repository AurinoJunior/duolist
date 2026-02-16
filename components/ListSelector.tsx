'use client';

import { useState } from 'react';
import { GroceryList } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Archive, Share2, Trash2 } from 'lucide-react';

interface ListSelectorProps {
  lists: GroceryList[];
  activeListId: string | null;
  onSelect: (id: string) => void;
  onCreate: (name: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => string;
}

/**
 * Componente de seleção e gerenciamento de listas
 * Permite trocar entre listas, criar novas, arquivar e compartilhar
 */
export function ListSelector({
  lists,
  activeListId,
  onSelect,
  onCreate,
  onArchive,
  onDelete,
  onShare,
}: ListSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');

  const activeList = lists.find(l => l.id === activeListId);

  const handleCreate = () => {
    if (newListName.trim()) {
      onCreate(newListName.trim());
      setNewListName('');
      setIsCreating(false);
    }
  };

  const handleShare = (id: string) => {
    const text = onShare(id);
    navigator.clipboard.writeText(text);
    alert('Lista copiada! Cole onde quiser 📋');
  };

  return (
    <div className="relative">
      {/* Botão Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full px-6 py-4 rounded-2xl
          bg-white border border-neutral-200
          flex items-center justify-between
          hover:shadow-md transition-all duration-200
        "
      >
        <div className="flex-1 text-left">
          <p className="text-sm text-neutral-500 mb-0.5">Lista Atual</p>
          <p className="text-lg font-semibold text-neutral-800">
            {activeList?.name || 'Selecione uma lista'}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-neutral-400" />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute top-full left-0 right-0 mt-2
              bg-white rounded-2xl border border-neutral-200
              shadow-xl overflow-hidden z-50
            "
          >
            {/* Lista de Listas */}
            <div className="max-h-64 overflow-y-auto">
              {lists.length === 0 ? (
                <div className="px-6 py-8 text-center text-neutral-500">
                  <p className="text-sm">Nenhuma lista criada ainda</p>
                </div>
              ) : (
                lists.map((list) => (
                  <div
                    key={list.id}
                    className="
                      group flex items-center gap-2
                      px-4 py-3 hover:bg-neutral-50
                      transition-colors border-b border-neutral-100
                      last:border-b-0
                    "
                  >
                    <button
                      onClick={() => {
                        onSelect(list.id);
                        setIsOpen(false);
                      }}
                      className="flex-1 text-left"
                    >
                      <p className={`
                        font-medium
                        ${list.id === activeListId ? 'text-orange-500' : 'text-neutral-800'}
                      `}>
                        {list.name}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {list.items.length} {list.items.length === 1 ? 'item' : 'itens'}
                      </p>
                    </button>

                    {/* Ações da Lista */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleShare(list.id)}
                        className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Compartilhar"
                      >
                        <Share2 size={14} className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => {
                          onArchive(list.id);
                          setIsOpen(false);
                        }}
                        className="p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                        title="Arquivar"
                      >
                        <Archive size={14} className="text-yellow-600" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Deletar "${list.name}"?`)) {
                            onDelete(list.id);
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Deletar"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Formulário de Nova Lista */}
            <div className="border-t border-neutral-200 p-3">
              {!isCreating ? (
                <button
                  onClick={() => setIsCreating(true)}
                  className="
                    w-full py-2.5 px-4 rounded-xl
                    bg-gradient-to-r from-orange-400 to-peach-400
                    text-white font-medium text-sm
                    flex items-center justify-center gap-2
                    hover:shadow-md transition-all duration-200
                  "
                >
                  <Plus size={16} />
                  Nova Lista
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    placeholder="Nome da lista..."
                    autoFocus
                    className="
                      flex-1 px-3 py-2 rounded-lg
                      border border-neutral-200
                      focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                      outline-none text-sm
                    "
                  />
                  <button
                    onClick={handleCreate}
                    disabled={!newListName.trim()}
                    className="
                      px-4 py-2 rounded-lg
                      bg-orange-400 text-white text-sm font-medium
                      disabled:opacity-50 disabled:cursor-not-allowed
                      hover:bg-orange-500 transition-colors
                    "
                  >
                    Criar
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para fechar dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
