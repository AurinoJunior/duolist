/**
 * Tipos principais da aplicação de lista de compras
 */

export type Category =
	| "frutas"
	| "verduras"
	| "carnes"
	| "laticínios"
	| "grãos"
	| "bebidas"
	| "limpeza"
	| "higiene"
	| "outros";

export interface GroceryItem {
	id: string;
	name: string;
	category: Category;
	completed: boolean;
	order: number;
	createdAt: string;
}

export interface GroceryList {
	id: string;
	name: string;
	items: GroceryItem[];
	createdAt: string;
	updatedAt: string;
	isArchived: boolean;
}

export interface CategoryConfig {
	value: Category;
	label: string;
	color: string;
	emoji: string;
}
