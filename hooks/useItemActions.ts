"use client";

import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import { listHelpers } from "@/lib/storage";
import type { TCategory, TItem, TList } from "@/types";

/**
 * Ações de CRUD para itens dentro da lista ativa
 */
export function useItemActions(
	activeListId: string | null,
	setLists: Dispatch<SetStateAction<TList[]>>,
) {
	const addItem = useCallback(
		(name: string, category: TCategory) => {
			if (!activeListId) return;

			setLists((prev) =>
				prev.map((list) => {
					if (list.id !== activeListId) return list;

					const newItem: TItem = {
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
				}),
			);
		},
		[activeListId, setLists],
	);

	const updateItem = useCallback(
		(itemId: string, updates: Partial<TItem>) => {
			if (!activeListId) return;

			setLists((prev) =>
				prev.map((list) => {
					if (list.id !== activeListId) return list;

					return listHelpers.touchList({
						...list,
						items: list.items.map((item) =>
							item.id === itemId ? { ...item, ...updates } : item,
						),
					});
				}),
			);
		},
		[activeListId, setLists],
	);

	const removeItem = useCallback(
		(itemId: string) => {
			if (!activeListId) return;

			setLists((prev) =>
				prev.map((list) => {
					if (list.id !== activeListId) return list;

					return listHelpers.touchList({
						...list,
						items: list.items.filter((item) => item.id !== itemId),
					});
				}),
			);
		},
		[activeListId, setLists],
	);

	const reorderItems = useCallback(
		(reorderedItems: TItem[]) => {
			if (!activeListId) return;

			setLists((prev) =>
				prev.map((list) => {
					if (list.id !== activeListId) return list;

					const itemsWithOrder = reorderedItems.map((item, index) => ({
						...item,
						order: index,
					}));

					return listHelpers.touchList({
						...list,
						items: itemsWithOrder,
					});
				}),
			);
		},
		[activeListId, setLists],
	);

	return { addItem, updateItem, removeItem, reorderItems };
}
