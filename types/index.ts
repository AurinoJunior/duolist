/**
 * Tipos principais da aplicação de lista de compras
 */

export type TCategory =
	| "frutas"
	| "verduras"
	| "carnes"
	| "laticínios"
	| "grãos"
	| "bebidas"
	| "limpeza"
	| "higiene"
	| "outros";

export type TItem = {
	id: string;
	name: string;
	category: TCategory;
	completed: boolean;
	order: number;
	createdAt: string;
};

export type TList = {
	id: string;
	name: string;
	items: TItem[];
	createdAt: string;
	updatedAt: string;
	isArchived: boolean;
};

export interface CategoryConfig {
	value: TCategory;
	label: string;
	color: string;
	emoji: string;
}
