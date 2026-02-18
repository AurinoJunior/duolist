"use client";

import { useState } from "react";
import type { TList } from "@/types";
import { useItemActions } from "./useItemActions";
import { useListActions } from "./useListActions";
import { useListsStorage } from "./useListsStorage";

/**
 * Fachada principal — compõe os hooks especializados e expõe a API pública
 */
export function useLists() {
	const [lists, setLists] = useState<TList[]>([]);
	const [activeListId, setActiveListId] = useState<string | null>(null);

	const { isLoaded } = useListsStorage({
		lists,
		setLists,
		setActiveListId,
	});

	const listActions = useListActions(
		lists,
		activeListId,
		setLists,
		setActiveListId,
	);

	const itemActions = useItemActions(activeListId, setLists);

	return {
		lists: lists.filter((l) => !l.isArchived),
		activeList: lists.find((l) => l.id === activeListId) || null,
		archivedLists: lists.filter((l) => l.isArchived),
		isLoaded,
		...listActions,
		...itemActions,
	};
}
