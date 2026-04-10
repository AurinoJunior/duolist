"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CATEGORIES } from "@/lib/constants";
import type { TCategory } from "@/types";

interface AddItemFormProps {
	onAdd: (name: string, category: TCategory) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const desktopQuery =
	typeof window !== "undefined"
		? window.matchMedia("(min-width: 768px)")
		: null;

function useIsDesktop() {
	return useSyncExternalStore(
		(cb) => {
			desktopQuery?.addEventListener("change", cb);
			return () => desktopQuery?.removeEventListener("change", cb);
		},
		() => desktopQuery?.matches ?? false,
		() => false,
	);
}

export function AddItemForm({ onAdd, isOpen, onOpenChange }: AddItemFormProps) {
	const [itemName, setItemName] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<TCategory>("outros");
	const inputRef = useRef<HTMLInputElement>(null);
	const isDesktop = useIsDesktop();

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => inputRef.current?.focus(), 100);
		} else {
			setItemName("");
			setSelectedCategory("outros");
		}
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (itemName.trim()) {
			onAdd(itemName.trim(), selectedCategory);
			setItemName("");
			setSelectedCategory("outros");
			onOpenChange(false);
		}
	};

	const handleClose = () => onOpenChange(false);

	return (
		<>
			{/* Botão de trigger — sempre visível */}
			<button
				type="button"
				onClick={() => onOpenChange(true)}
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

			{/* Drawer overlay */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							key="backdrop"
							className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={handleClose}
						/>

						{/* Drawer */}
						<div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none">
							<motion.div
								key="drawer"
								className="
									w-full md:max-w-lg pointer-events-auto
									bg-white rounded-t-3xl md:rounded-2xl
									shadow-2xl
								"
								initial={isDesktop ? { opacity: 0 } : { y: "100%" }}
								animate={isDesktop ? { opacity: 1 } : { y: 0 }}
								exit={isDesktop ? { opacity: 0 } : { y: "100%" }}
								transition={{ type: "spring", damping: 32, stiffness: 320 }}
							>
								{/* Handle bar (mobile) */}
								<div className="flex justify-center pt-3 pb-1 md:hidden">
									<div className="w-10 h-1 rounded-full bg-neutral-300" />
								</div>

								{/* Header */}
								<div className="flex items-center justify-between px-5 py-4">
									<h2 className="text-lg font-semibold text-neutral-800">
										Adicionar item
									</h2>
									<button
										type="button"
										onClick={handleClose}
										className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-neutral-100 transition-colors"
									>
										<X size={18} className="text-neutral-500" />
									</button>
								</div>

								<form onSubmit={handleSubmit} className="px-5 pb-6 space-y-5">
									{/* Input Nome */}
									<div>
										<label
											htmlFor="item_name"
											className="block text-sm font-medium text-neutral-700 mb-2"
										>
											Nome do item
										</label>
										<input
											ref={inputRef}
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
										<div className="grid grid-cols-4 gap-2">
											{CATEGORIES.map((category) => (
												<button
													key={category.value}
													type="button"
													onClick={() => setSelectedCategory(category.value)}
													className={`
														px-2 py-2.5 rounded-xl
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
													<span className="text-xl">{category.emoji}</span>
													<span className="text-xs font-medium leading-tight">
														{category.label}
													</span>
												</button>
											))}
										</div>
									</div>

									{/* Botão de submit */}
									<button
										type="submit"
										disabled={!itemName.trim()}
										className="
											w-full py-3.5 px-4 rounded-xl
											bg-gradient-to-r from-orange-400 to-peach-400
											text-white font-medium
											hover:shadow-md hover:scale-[1.02]
											disabled:opacity-50 disabled:cursor-not-allowed
											disabled:hover:scale-100 disabled:hover:shadow-none
											transition-all duration-200
											flex items-center justify-center gap-2
										"
									>
										<Plus size={18} />
										Adicionar
									</button>
								</form>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
