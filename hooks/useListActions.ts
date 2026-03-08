"use client";

import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import { listHelpers, storage } from "@/lib/storage";
import type { TTemplate } from "@/lib/templates";
import type { TItem, TList } from "@/types";

/**
 * Ações de CRUD para listas de compras
 */
export function useListActions(
	lists: TList[],
	activeListId: string | null,
	setLists: Dispatch<SetStateAction<TList[]>>,
	setActiveListId: Dispatch<SetStateAction<string | null>>,
) {
	const selectList = useCallback(
		(id: string) => {
			setActiveListId(id);
			storage.setActiveListId(id);
		},
		[setActiveListId],
	);

	const createList = useCallback(
		(name: string) => {
			const newList = listHelpers.createList(name);
			setLists((prev) => [...prev, newList]);
			setActiveListId(newList.id);
			storage.setActiveListId(newList.id);
			return newList;
		},
		[setLists, setActiveListId],
	);

	const archiveList = useCallback(
		(id: string) => {
			setLists((prev) =>
				prev.map((list) =>
					list.id === id ? { ...list, isArchived: true } : list,
				),
			);

			if (id === activeListId) {
				const nextActive = lists.find((l) => l.id !== id && !l.isArchived);
				if (nextActive) {
					selectList(nextActive.id);
				} else {
					setActiveListId(null);
				}
			}
		},
		[activeListId, lists, selectList, setLists, setActiveListId],
	);

	const deleteList = useCallback(
		(id: string) => {
			setLists((prev) => prev.filter((list) => list.id !== id));

			if (id === activeListId) {
				const nextActive = lists.find((l) => l.id !== id && !l.isArchived);
				if (nextActive) {
					selectList(nextActive.id);
				} else {
					setActiveListId(null);
				}
			}
		},
		[activeListId, lists, selectList, setLists, setActiveListId],
	);

	const createListFromTemplate = useCallback(
		(template: TTemplate) => {
			const newList = listHelpers.createList(template.name);
			const items: TItem[] = template.items.map((item, index) => ({
				id: crypto.randomUUID(),
				name: item.name,
				category: item.category,
				completed: false,
				order: index,
				createdAt: new Date().toISOString(),
			}));
			const listWithItems: TList = { ...newList, items };
			setLists((prev) => [...prev, listWithItems]);
			setActiveListId(listWithItems.id);
			storage.setActiveListId(listWithItems.id);
			return listWithItems;
		},
		[setLists, setActiveListId],
	);

	return {
		createList,
		createListFromTemplate,
		selectList,
		archiveList,
		deleteList,
	};
}
