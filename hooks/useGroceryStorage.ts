"use client";

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import type { TList } from "@/types";

/**
 * Gerencia o estado base da aplicação e sincronização com localStorage
 */
export function useGroceryStorage() {
	const [lists, setLists] = useState<TList[]>([]);
	const [activeListId, setActiveListId] = useState<string | null>(null);
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

	// Persiste mudanças no localStorage
	useEffect(() => {
		if (isLoaded) {
			storage.saveLists(lists);
		}
	}, [lists, isLoaded]);

	return { lists, setLists, activeListId, setActiveListId, isLoaded };
}
