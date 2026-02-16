'use client';

import { useGroceryLists } from '@/hooks/useGroceryLists';
import { GroceryItemComponent } from '@/components/GroceryItemComponent';
import { AddItemForm } from '@/components/AddItemForm';
import { ListSelector } from '@/components/ListSelector';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Archive } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const {
    activeLists,
    archivedLists,
    activeList,
    isLoaded,
    createList,
    selectList,
    addItem,
    updateItem,
    removeItem,
    reorderItems,
    archiveList,
    deleteList,
    shareList,
  } = useGroceryLists();

  const [showArchived, setShowArchived] = useState(false);

  // Aguarda carregamento do localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-cream-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <ShoppingBag size={40} className="text-orange-400" />
        </motion.div>
      </div>
    );
  }

  // Estado inicial: cria primeira lista
  if (activeLists.length === 0 && !showArchived) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-cream-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <ShoppingBag size={64} className="text-orange-400 mx-auto" />
          </motion.div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-3">
            Bem-vindo!
          </h1>
          <p className="text-neutral-600 mb-8">
            Crie sua primeira lista de compras para começar
          </p>
          <button
            onClick={() => createList('Minha Lista')}
            className="
              px-8 py-4 rounded-2xl
              bg-gradient-to-r from-orange-400 to-peach-400
              text-white font-semibold text-lg
              hover:shadow-lg hover:scale-105
              transition-all duration-200
            "
          >
            Criar Lista
          </button>
        </motion.div>
      </div>
    );
  }

  const displayLists = showArchived ? archivedLists : activeLists;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-cream-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag size={32} className="text-orange-400" />
            <h1 className="text-3xl font-bold text-neutral-800">
              Lista de Compras
            </h1>
          </div>
          <p className="text-neutral-600 ml-11">
            Organize suas compras de forma simples e eficiente
          </p>
        </motion.header>

        {/* Seletor de Lista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <ListSelector
            lists={displayLists}
            activeListId={activeList?.id || null}
            onSelect={selectList}
            onCreate={createList}
            onArchive={archiveList}
            onDelete={deleteList}
            onShare={shareList}
          />
        </motion.div>

        {/* Toggle Arquivados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-end"
        >
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              text-sm font-medium
              bg-white border border-neutral-200
              hover:bg-neutral-50 transition-colors
            "
          >
            <Archive size={16} />
            {showArchived ? 'Ver Ativas' : 'Ver Arquivadas'}
            {archivedLists.length > 0 && !showArchived && (
              <span className="
                px-2 py-0.5 rounded-full
                bg-yellow-100 text-yellow-700 text-xs font-semibold
              ">
                {archivedLists.length}
              </span>
            )}
          </button>
        </motion.div>

        {/* Conteúdo Principal */}
        {activeList && !showArchived ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Formulário de Adicionar */}
            <AddItemForm onAdd={addItem} />

            {/* Lista de Itens */}
            {activeList.items.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">
                    Itens ({activeList.items.length})
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {activeList.items.filter(i => i.completed).length} completos
                  </p>
                </div>

                <Reorder.Group
                  axis="y"
                  values={activeList.items}
                  onReorder={reorderItems}
                  className="space-y-2"
                >
                  <AnimatePresence>
                    {activeList.items
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                        <Reorder.Item
                          key={item.id}
                          value={item}
                          className="cursor-grab active:cursor-grabbing"
                        >
                          <GroceryItemComponent
                            item={item}
                            onToggle={(id) => updateItem(id, { completed: !item.completed })}
                            onDelete={removeItem}
                          />
                        </Reorder.Item>
                      ))}
                  </AnimatePresence>
                </Reorder.Group>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="
                  text-center py-16 px-6
                  bg-white rounded-2xl border-2 border-dashed border-neutral-200
                "
              >
                <p className="text-neutral-400 text-lg mb-2">
                  Lista vazia
                </p>
                <p className="text-neutral-400 text-sm">
                  Adicione seu primeiro item para começar
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : showArchived ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide px-2 mb-4">
              Listas Arquivadas ({archivedLists.length})
            </h2>
            {archivedLists.length === 0 ? (
              <div className="text-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed border-neutral-200">
                <Archive size={48} className="text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-400">
                  Nenhuma lista arquivada
                </p>
              </div>
            ) : (
              archivedLists.map((list) => (
                <div
                  key={list.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-neutral-800">{list.name}</h3>
                      <p className="text-sm text-neutral-500">
                        {list.items.length} {list.items.length === 1 ? 'item' : 'itens'} •{' '}
                        {new Date(list.updatedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteList(list.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Archive size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        ) : null}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-sm text-neutral-400"
        >
          <p>Feito com 🧡 para facilitar suas compras</p>
        </motion.footer>
      </div>
    </div>
  );
}
