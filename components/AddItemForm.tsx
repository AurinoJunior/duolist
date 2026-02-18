"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import type { TCategory } from "@/types";

interface AddItemFormProps {
	onAdd: (name: string, category: TCategory) => void;
}

/**
 * Formulário para adicionar novos itens
 * Inclui input de nome e seletor de categoria
 */
export function AddItemForm({ onAdd }: AddItemFormProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [itemName, setItemName] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<TCategory>("outros");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (itemName.trim()) {
			onAdd(itemName.trim(), selectedCategory);
			setItemName("");
			setSelectedCategory("outros");
			setIsOpen(false);
		}
	};

	return (
		<div>
			{!isOpen && (
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="
            w-full py-4 px-6 rounded-2xl
            bg-gradient-to-r from-orange-400 to-peach-400
            text-white font-medium
            flex items-center justify-center gap-2
            hover:shadow-lg hover:scale-[1.02]
            transition-all duration-200
          "
				>
					<Plus size={20} />
					Adicionar Item
				</button>
			)}

			{isOpen && (
				<form
					onSubmit={handleSubmit}
					className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-4"
				>
					{/* Input Nome */}
					<div>
						<label
							htmlFor="item_name"
							className="block text-sm font-medium text-neutral-700 mb-2"
						>
							Nome do item
						</label>
						<input
							id="item_name"
							type="text"
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
							placeholder="Ex: Maçã, Leite, Detergente..."
							className="
                  w-full px-4 py-3 rounded-xl
                  border border-neutral-200
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                  outline-none transition-all
                  text-neutral-800 placeholder-neutral-400
                "
						/>
					</div>

					{/* Seletor de Categoria */}
					<div>
						<p className="block text-sm font-medium text-neutral-700 mb-2">
							Categoria
						</p>
						<div className="grid grid-cols-3 gap-2">
							{CATEGORIES.map((category) => (
								<button
									key={category.value}
									type="button"
									onClick={() => setSelectedCategory(category.value)}
									className={`
                      px-3 py-2.5 rounded-xl
                      border-2 transition-all duration-200
                      flex flex-col items-center gap-1
                      ${
												selectedCategory === category.value
													? "border-current shadow-sm scale-105"
													: "border-neutral-200 hover:border-neutral-300"
											}
                    `}
									style={{
										color:
											selectedCategory === category.value
												? category.color
												: "#6B6B6B",
									}}
								>
									<span className="text-2xl">{category.emoji}</span>
									<span className="text-xs font-medium">{category.label}</span>
								</button>
							))}
						</div>
					</div>

					{/* Botões de Ação */}
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => {
								setIsOpen(false);
								setItemName("");
								setSelectedCategory("outros");
							}}
							className="
                  flex-1 py-3 px-4 rounded-xl
                  border border-neutral-200
                  text-neutral-600 font-medium
                  hover:bg-neutral-50
                  transition-all duration-200
                  flex items-center justify-center gap-2
                "
						>
							<X size={16} />
							Cancelar
						</button>
						<button
							type="submit"
							disabled={!itemName.trim()}
							className="
                  flex-1 py-3 px-4 rounded-xl
                  bg-gradient-to-r from-orange-400 to-peach-400
                  text-white font-medium
                  hover:shadow-md hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:hover:scale-100 disabled:hover:shadow-none
                  transition-all duration-200
                  flex items-center justify-center gap-2
                "
						>
							<Plus size={16} />
							Adicionar
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
