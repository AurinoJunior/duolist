import { CATEGORIES } from "@/lib/constants";
import type { TList } from "@/types";
import { Item } from "./Item";

interface ItensListProps {
	activeList: TList | null;
	updateItem: (
		itemId: string,
		updates: Partial<import("@/types").TItem>,
	) => void;
	removeItem: (itemId: string) => void;
}

const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.value, c]));

export const ItensList = ({
	activeList,
	updateItem,
	removeItem,
}: ItensListProps) => {
	if (!activeList) return null;

	const categories = [...new Set(activeList.items.map((i) => i.category))];

	const groups = categories.map((category) => {
		const items = activeList.items.filter((i) => i.category === category);
		return {
			category,
			config: CATEGORY_MAP[category],
			items: [...items].sort(
				(a, b) => Number(a.completed) - Number(b.completed),
			),
		};
	});

	return (
		<div className="anim-fade-in-up anim-delay-2">
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

					<div className="space-y-12">
						{groups.map(({ category, config, items }) => (
							<div key={category}>
								<div className="flex items-center gap-2 px-1 pt-2 mb-4 mt-8">
									<span className="text-xl">{config?.emoji}</span>
									<h3 className="text-xl font-semibold text-neutral-800">
										{config?.label}
									</h3>
								</div>

								<div className="space-y-2">
									{items.map((item) => (
										<Item
											key={item.id}
											item={item}
											onToggle={(id) =>
												updateItem(id, { completed: !item.completed })
											}
											onDelete={removeItem}
											onRename={(id, name) => updateItem(id, { name })}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div
					className="
						anim-fade-in
						text-center py-16 px-6
						bg-white rounded-2xl border-2 border-dashed border-neutral-200
					"
				>
					<p className="text-neutral-400 text-lg mb-2">Lista vazia</p>
					<p className="text-neutral-400 text-sm">
						Adicione seu primeiro item para começar
					</p>
				</div>
			)}
		</div>
	);
};
