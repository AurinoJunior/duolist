import { AnimatePresence, motion, Reorder } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";
import type { TCategory, TItem, TList } from "@/types";
import { Item } from "./Item";

interface ItensListProps {
	activeList: TList | null;
	reorderItems: (reorderedItems: TItem[]) => void;
	updateItem: (itemId: string, updates: Partial<TItem>) => void;
	removeItem: (itemId: string) => void;
}

const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.value, c]));

export const ItensList = ({
	activeList,
	reorderItems,
	updateItem,
	removeItem,
}: ItensListProps) => {
	if (!activeList) return null;

	const sortedItems = [...activeList.items].sort((a, b) => a.order - b.order);

	const categories = [...new Set(sortedItems.map((i) => i.category))];

	const groups = categories.map((category) => ({
		category,
		config: CATEGORY_MAP[category] ?? {
			label: category,
			emoji: "🛒",
			color: "#E5E5E5",
		},
		items: sortedItems.filter((i) => i.category === category),
	}));

	const handleGroupReorder = (category: TCategory, reordered: TItem[]) => {
		const others = activeList.items.filter((i) => i.category !== category);
		reorderItems([...others, ...reordered]);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			{activeList.items.length > 0 ? (
				<div className="space-y-5">
					<div className="flex items-center justify-between px-2">
						<h2 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">
							Itens ({activeList.items.length})
						</h2>
						<p className="text-sm text-neutral-500">
							{activeList.items.filter((i) => i.completed).length} completos
						</p>
					</div>

					{groups.map(({ category, config, items }) => (
						<div key={category} className="space-y-2">
							<p className="px-2 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
								{config.emoji} {config.label}
							</p>

							<Reorder.Group
								axis="y"
								values={items}
								onReorder={(reordered) =>
									handleGroupReorder(category, reordered)
								}
								className="space-y-2"
							>
								<AnimatePresence>
									{items.map((item) => (
										<Reorder.Item
											key={item.id}
											value={item}
											className="cursor-grab active:cursor-grabbing"
										>
											<Item
												item={item}
												onToggle={(id) =>
													updateItem(id, { completed: !item.completed })
												}
												onDelete={removeItem}
												onRename={(id, name) => updateItem(id, { name })}
											/>
										</Reorder.Item>
									))}
								</AnimatePresence>
							</Reorder.Group>
						</div>
					))}
				</div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="
						text-center py-16 px-6
						bg-white rounded-2xl border-2 border-dashed border-neutral-200
					"
				>
					<p className="text-neutral-400 text-lg mb-2">Lista vazia</p>
					<p className="text-neutral-400 text-sm">
						Adicione seu primeiro item para começar
					</p>
				</motion.div>
			)}
		</motion.div>
	);
};
