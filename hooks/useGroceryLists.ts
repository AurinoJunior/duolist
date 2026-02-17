"use client";

import { useCallback } from "react";
import { buildShareText } from "@/lib/shareList";
import { useGroceryStorage } from "./useGroceryStorage";
import { useItemActions } from "./useItemActions";
import { useListActions } from "./useListActions";

/**
 * Fachada principal — compõe os hooks especializados e expõe a API pública
 */
export function useGroceryLists() {
	const { lists, setLists, activeListId, setActiveListId, isLoaded } =
		useGroceryStorage();

	const listActions = useListActions(
		lists,
		activeListId,
		setLists,
		setActiveListId,
	);

	const itemActions = useItemActions(activeListId, setLists);

	const shareList = useCallback(
		(id: string) => {
			const list = lists.find((l) => l.id === id);
			if (!list) return "";
			return buildShareText(list);
		},
		[lists],
	);

	return {
		lists,
		activeList: lists.find((l) => l.id === activeListId) || null,
		activeLists: lists.filter((l) => !l.isArchived),
		archivedLists: lists.filter((l) => l.isArchived),
		isLoaded,
		...listActions,
		...itemActions,
		shareList,
	};
}
