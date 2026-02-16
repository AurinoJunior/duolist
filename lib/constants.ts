import type { CategoryConfig } from "@/types";

/**
 * Configurações das categorias pré-definidas
 * Cada categoria tem cor e emoji únicos para fácil identificação visual
 */
export const CATEGORIES: CategoryConfig[] = [
	{ value: "frutas", label: "Frutas", color: "#FFB88C", emoji: "🍎" },
	{ value: "verduras", label: "Verduras", color: "#98D8C8", emoji: "🥬" },
	{ value: "carnes", label: "Carnes", color: "#FF8C42", emoji: "🥩" },
	{ value: "laticínios", label: "Laticínios", color: "#F6E6D8", emoji: "🥛" },
	{ value: "grãos", label: "Grãos", color: "#D4A373", emoji: "🌾" },
	{ value: "bebidas", label: "Bebidas", color: "#A8DADC", emoji: "🥤" },
	{ value: "limpeza", label: "Limpeza", color: "#B8B8D1", emoji: "🧹" },
	{ value: "higiene", label: "Higiene", color: "#C9ADA7", emoji: "🧼" },
	{ value: "outros", label: "Outros", color: "#E5E5E5", emoji: "📦" },
];

/**
 * Chaves do localStorage
 */
export const STORAGE_KEYS = {
	LISTS: "grocery_lists",
	ACTIVE_LIST: "active_list_id",
} as const;
