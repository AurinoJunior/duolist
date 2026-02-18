"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import type { TList } from "@/types";

/**
 * Gerencia a sincronização com localStorage
 */
interface ListStorageProps {
	lists: TList[];
	setLists: Dispatch<SetStateAction<TList[]>>;
	activeListId: string | null;
	setActiveListId: Dispatch<SetStateAction<string | null>>;
}

export function useListsStorage({
	lists,
	setLists,
	activeListId,
	setActiveListId,
}: ListStorageProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	// Carrega dados do localStorage na inicialização
	useEffect(() => {
		const savedLists = storage.getLists();
		const savedActiveId = storage.getActiveListId();

		setLists(savedLists);

		if (!savedActiveId && savedLists.length > 0) {
			const firstActive = savedLists.find((l) => !l.isArchived);
			if (firstActive) {
				setActiveListId(firstActive.id);
				storage.setActiveListId(firstActive.id);
			}
		} else {
			setActiveListId(savedActiveId);
		}

		setIsLoaded(true);
	}, []);

	// Persiste mudanças no localStorage sempre que lists é alterado
	useEffect(() => {
		if (isLoaded) {
			storage.saveLists(lists);
			storage.setActiveListId(activeListId);
		}
	}, [lists, isLoaded]);

	return { isLoaded };
}
