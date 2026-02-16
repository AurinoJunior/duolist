'use client';

import { useState, useEffect, useCallback } from 'react';
import { GroceryList, GroceryItem, Category } from '@/types';
import { storage, listHelpers } from '@/lib/storage';

/**
 * Hook principal para gerenciar estado das listas de compras
 * Centraliza toda lógica de manipulação de dados
 */
export function useGroceryLists() {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const savedLists = storage.getLists();
    const savedActiveId = storage.getActiveListId();
    
    setLists(savedLists);
    
    // Se não há lista ativa mas existem listas, seleciona a primeira não arquivada
    if (!savedActiveId && savedLists.length > 0) {
      const firstActive = savedLists.find(l => !l.isArchived);
      if (firstActive) {
        setActiveListId(firstActive.id);
        storage.setActiveListId(firstActive.id);
      }
    } else {
      setActiveListId(savedActiveId);
    }
    
    setIsLoaded(true);
  }, []);

  // Persiste mudanças no localStorage
  useEffect(() => {
    if (isLoaded) {
      storage.saveLists(lists);
    }
  }, [lists, isLoaded]);

  // Busca lista ativa
  const activeList = lists.find(l => l.id === activeListId) || null;

  /**
   * Cria uma nova lista
   */
  const createList = useCallback((name: string) => {
    const newList = listHelpers.createList(name);
    setLists(prev => [...prev, newList]);
    setActiveListId(newList.id);
    storage.setActiveListId(newList.id);
    return newList;
  }, []);

  /**
   * Seleciona lista ativa
   */
  const selectList = useCallback((id: string) => {
    setActiveListId(id);
    storage.setActiveListId(id);
  }, []);

  /**
   * Adiciona item à lista ativa
   */
  const addItem = useCallback((name: string, category: Category) => {
    if (!activeListId) return;

    setLists(prev => prev.map(list => {
      if (list.id !== activeListId) return list;

      const newItem: GroceryItem = {
        id: crypto.randomUUID(),
        name,
        category,
        completed: false,
        order: list.items.length,
        createdAt: new Date().toISOString(),
      };

      return listHelpers.touchList({
        ...list,
        items: [...list.items, newItem],
      });
    }));
  }, [activeListId]);

  /**
   * Atualiza item
   */
  const updateItem = useCallback((itemId: string, updates: Partial<GroceryItem>) => {
    if (!activeListId) return;

    setLists(prev => prev.map(list => {
      if (list.id !== activeListId) return list;

      return listHelpers.touchList({
        ...list,
        items: list.items.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        ),
      });
    }));
  }, [activeListId]);

  /**
   * Remove item
   */
  const removeItem = useCallback((itemId: string) => {
    if (!activeListId) return;

    setLists(prev => prev.map(list => {
      if (list.id !== activeListId) return list;

      return listHelpers.touchList({
        ...list,
        items: list.items.filter(item => item.id !== itemId),
      });
    }));
  }, [activeListId]);

  /**
   * Reordena itens (usado no drag and drop)
   */
  const reorderItems = useCallback((reorderedItems: GroceryItem[]) => {
    if (!activeListId) return;

    setLists(prev => prev.map(list => {
      if (list.id !== activeListId) return list;

      const itemsWithOrder = reorderedItems.map((item, index) => ({
        ...item,
        order: index,
      }));

      return listHelpers.touchList({
        ...list,
        items: itemsWithOrder,
      });
    }));
  }, [activeListId]);

  /**
   * Arquiva lista (move para histórico)
   */
  const archiveList = useCallback((id: string) => {
    setLists(prev => prev.map(list =>
      list.id === id ? { ...list, isArchived: true } : list
    ));

    // Se arquivou a lista ativa, seleciona outra
    if (id === activeListId) {
      const nextActive = lists.find(l => l.id !== id && !l.isArchived);
      if (nextActive) {
        selectList(nextActive.id);
      } else {
        setActiveListId(null);
      }
    }
  }, [activeListId, lists, selectList]);

  /**
   * Deleta lista permanentemente
   */
  const deleteList = useCallback((id: string) => {
    setLists(prev => prev.filter(list => list.id !== id));

    if (id === activeListId) {
      const nextActive = lists.find(l => l.id !== id && !l.isArchived);
      if (nextActive) {
        selectList(nextActive.id);
      } else {
        setActiveListId(null);
      }
    }
  }, [activeListId, lists, selectList]);

  /**
   * Gera texto para compartilhar
   */
  const shareList = useCallback((id: string) => {
    const list = lists.find(l => l.id === id);
    if (!list) return '';

    let text = `📝 ${list.name}\n\n`;
    
    const itemsByCategory = list.items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<Category, GroceryItem[]>);

    Object.entries(itemsByCategory).forEach(([category, items]) => {
      text += `${category.toUpperCase()}\n`;
      items.forEach(item => {
        text += `${item.completed ? '✓' : '○'} ${item.name}\n`;
      });
      text += '\n';
    });

    return text;
  }, [lists]);

  return {
    lists,
    activeList,
    activeLists: lists.filter(l => !l.isArchived),
    archivedLists: lists.filter(l => l.isArchived),
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
  };
}
