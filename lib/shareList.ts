import type { Category, GroceryItem, GroceryList } from "@/types";

/**
 * Gera texto formatado para compartilhar uma lista
 */
export function buildShareText(list: GroceryList): string {
	let text = `📝 ${list.name}\n\n`;

	const itemsByCategory = list.items.reduce(
		(acc, item) => {
			if (!acc[item.category]) acc[item.category] = [];
			acc[item.category].push(item);
			return acc;
		},
		{} as Record<Category, GroceryItem[]>,
	);

	for (const [category, items] of Object.entries(itemsByCategory)) {
		text += `${category.toUpperCase()}\n`;
		for (const item of items) {
			text += `${item.completed ? "✓" : "○"} ${item.name}\n`;
		}
		text += "\n";
	}

	return text;
}
