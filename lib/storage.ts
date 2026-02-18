import type { TList } from "@/types";
import { STORAGE_KEYS } from "./constants";

/**
 * Utilitários para gerenciar dados no localStorage
 * Preparado para futura migração para banco de dados
 */

export const storage = {
	/**
	 * Busca todas as listas salvas
	 */
	getLists: (): TList[] => {
		if (typeof window === "undefined") return [];
		try {
			const data = localStorage.getItem(STORAGE_KEYS.LISTS);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Erro ao carregar listas:", error);
			return [];
		}
	},

	/**
	 * Salva todas as listas
	 */
	saveLists: (lists: TList[]): void => {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
		} catch (error) {
			console.error("Erro ao salvar listas:", error);
		}
	},

	/**
	 * Busca ID da lista ativa
	 */
	getActiveListId: (): string | null => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(STORAGE_KEYS.ACTIVE_LIST);
	},

	/**
	 * Define lista ativa
	 */
	setActiveListId: (id: string | null): void => {
		if (typeof window === "undefined") return;
		localStorage.setItem(STORAGE_KEYS.ACTIVE_LIST, id ?? "");
	},

	/**
	 * Limpa todos os dados (útil para reset)
	 */
	clear: (): void => {
		if (typeof window === "undefined") return;
		localStorage.removeItem(STORAGE_KEYS.LISTS);
		localStorage.removeItem(STORAGE_KEYS.ACTIVE_LIST);
	},
};

/**
 * Helpers para manipulação de listas
 */
export const listHelpers = {
	/**
	 * Cria uma nova lista vazia
	 */
	createList: (name: string): TList => ({
		id: crypto.randomUUID(),
		name,
		items: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		isArchived: false,
	}),

	/**
	 * Atualiza timestamp de modificação
	 */
	touchList: (list: TList): TList => ({
		...list,
		updatedAt: new Date().toISOString(),
	}),
};
