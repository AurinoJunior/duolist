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
			{ name: "5kg Arroz", category: "cesta_basica" },
			{ name: "2kg Feijão", category: "cesta_basica" },
			{ name: "Macarrão", category: "cesta_basica" },
			{ name: "Cuscuz", category: "cesta_basica" },
			{ name: "Óleo de soja", category: "cesta_basica" },
			{ name: "Azeite", category: "cesta_basica" },
			{ name: "Sal", category: "cesta_basica" },
			{ name: "Suco de garrafinha", category: "outros" },
			{ name: "Açúcar", category: "cesta_basica" },
			{ name: "Bolacha recheada", category: "outros" },
			{ name: "Molho de tomate", category: "cesta_basica" },
			{ name: "Leite", category: "cesta_basica" },
			{ name: "Ketchup", category: "outros" },
			{ name: "Mostarda", category: "outros" },
			{ name: "Maionese", category: "outros" },
			{ name: "Leite condensado", category: "cesta_basica" },
			{ name: "Creme de leite", category: "cesta_basica" },
			{ name: "Pão", category: "cesta_basica" },
			{ name: "Rap 10", category: "outros" },
			{ name: "Sucrilhos", category: "outros" },
			{ name: "Achocolatado em pó", category: "outros" },
			{ name: "Iorgute Danone", category: "outros" },
			{ name: "Farofa", category: "cesta_basica" },
			{ name: "Papel higiênico", category: "higiene" },
			{ name: "Sabonete", category: "higiene" },
			{ name: "Pasta de dente", category: "higiene" },
			{ name: "Escova de dentes", category: "higiene" },
			{ name: "Fio dental", category: "higiene" },
			{ name: "Sabonete liquido (para mãos)", category: "higiene" },
			{ name: "Papel toalha", category: "limpeza" },
			{ name: "Papel Alumínio", category: "outros" },
			{ name: "Papel filme", category: "outros" },
			{ name: "Sabão líquido", category: "limpeza" },
			{ name: "Detergente", category: "limpeza" },
			{ name: "Esponja de cozinha", category: "limpeza" },
			{ name: "Cif / Veja", category: "limpeza" },
			{ name: "Limpa vidro", category: "limpeza" },
			{ name: "Saco de lixo preto 30l", category: "limpeza" },
			{ name: "Saco de lixo banheiro", category: "limpeza" },
			{ name: "Aguá sanitaria", category: "limpeza" },
		],
	},
	{
		id: "feira-semanal",
		name: "Feira Semanal",
		emoji: "🥦",
		description: "Frutas e verduras da semana",
		items: [
			{ name: "Banana", category: "frutas" },
			{ name: "Limão", category: "frutas" },
			{ name: "Alface", category: "verduras" },
			{ name: "Tomate", category: "verduras" },
			{ name: "Cenoura", category: "verduras" },
			{ name: "Cebola", category: "verduras" },
			{ name: "Alho", category: "verduras" },
			{ name: "Temperos", category: "outros" },
		],
	},
	{
		id: "acougue-semanal",
		name: "Açougue Semanal",
		emoji: "🥩",
		description: "Carnes para a semana",
		items: [
			{ name: "2kg de carne moída", category: "carnes" },
			{ name: "2kg de filé de frango", category: "carnes" },
			{ name: "Bifé", category: "carnes" },
			{ name: "Carne de panela", category: "carnes" },
			{ name: "Bacon", category: "carnes" },
			{ name: "Salsicha", category: "carnes" },
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
			{ name: "Desodorante", category: "higiene" },
			{ name: "Escova de dentes Curaprox", category: "higiene" },
			{ name: "Lenços umidecidos", category: "higiene" },
			{ name: "Desinfetante", category: "limpeza" },
		],
	},
];
