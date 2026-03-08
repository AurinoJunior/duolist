import type { TCategory } from "@/types";

export type TTemplateItem = { name: string; category: TCategory };

export type TTemplate = {
	id: string;
	name: string;
	description: string;
	emoji: string;
	items: TTemplateItem[];
};

export const TEMPLATES: TTemplate[] = [
	{
		id: "mercado-mensal",
		name: "Mercado Mensal",
		emoji: "🛒",
		description: "Itens básicos para o mês",
		items: [
			{ name: "Arroz", category: "grãos" },
			{ name: "Feijão", category: "grãos" },
			{ name: "Macarrão", category: "grãos" },
			{ name: "Leite", category: "laticínios" },
			{ name: "Queijo", category: "laticínios" },
			{ name: "Manteiga", category: "laticínios" },
			{ name: "Ovos", category: "outros" },
			{ name: "Azeite", category: "outros" },
			{ name: "Açúcar", category: "outros" },
			{ name: "Sal", category: "outros" },
			{ name: "Café", category: "bebidas" },
			{ name: "Suco", category: "bebidas" },
		],
	},
	{
		id: "feira-semanal",
		name: "Feira Semanal",
		emoji: "🥦",
		description: "Frutas e verduras da semana",
		items: [
			{ name: "Maçã", category: "frutas" },
			{ name: "Banana", category: "frutas" },
			{ name: "Laranja", category: "frutas" },
			{ name: "Melão", category: "frutas" },
			{ name: "Uva", category: "frutas" },
			{ name: "Alface", category: "verduras" },
			{ name: "Tomate", category: "verduras" },
			{ name: "Cenoura", category: "verduras" },
			{ name: "Chuchu", category: "verduras" },
			{ name: "Brócolis", category: "verduras" },
			{ name: "Cebola", category: "verduras" },
			{ name: "Alho", category: "verduras" },
		],
	},
	{
		id: "acougue-semanal",
		name: "Açougue Semanal",
		emoji: "🥩",
		description: "Carnes para a semana",
		items: [
			{ name: "Frango inteiro", category: "carnes" },
			{ name: "Carne moída", category: "carnes" },
			{ name: "Costela", category: "carnes" },
			{ name: "Linguiça", category: "carnes" },
			{ name: "Filé de peixe", category: "carnes" },
			{ name: "Bacon", category: "carnes" },
		],
	},
	{
		id: "higiene",
		name: "Higiene & Limpeza",
		emoji: "🧴",
		description: "Produtos de higiene e limpeza",
		items: [
			{ name: "Shampoo", category: "higiene" },
			{ name: "Condicionador", category: "higiene" },
			{ name: "Sabonete", category: "higiene" },
			{ name: "Pasta de dente", category: "higiene" },
			{ name: "Papel higiênico", category: "higiene" },
			{ name: "Desodorante", category: "higiene" },
			{ name: "Detergente", category: "limpeza" },
			{ name: "Desinfetante", category: "limpeza" },
			{ name: "Esponja de cozinha", category: "limpeza" },
			{ name: "Amaciante", category: "limpeza" },
		],
	},
];
