"use client";

import { AnimatePresence, motion, Reorder } from "framer-motion";
import { Archive, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { AddItemForm } from "@/components/AddItemForm";
import { Footer } from "@/components/Footer";
import { GroceryItemComponent } from "@/components/GroceryItemComponent";
import { Header } from "@/components/Header";
import { ListSelector } from "@/components/ListSelector";
import { Loading } from "@/components/Loading";
import { useGroceryLists } from "@/hooks/useGroceryLists";

export default function Home() {
	const [showArchived, setShowArchived] = useState(false);
	const {
		activeLists,
		archivedLists,
		activeList,
		isLoaded,
		createList,
		selectList,
		addItem,
		updateItem,
		removeItem,
		reorderItems,
		archiveList,
		deleteList,
	} = useGroceryLists();

	if (!isLoaded) return <Loading />;

	const displayLists = showArchived ? archivedLists : activeLists;

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-cream-50">
			<div className="max-w-2xl mx-auto px-4 py-8 relative h-dvh">
				<Header />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="mb-6"
				>
					<ListSelector
						lists={displayLists}
						activeListId={activeList?.id || null}
						onSelect={selectList}
						onCreate={createList}
						onArchive={archiveList}
						onDelete={deleteList}
					/>
				</motion.div>

				{/* Toggle Arquivados */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="mb-6 flex justify-end"
				>
					<button
						type="button"
						onClick={() => setShowArchived(!showArchived)}
						className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              text-sm font-medium
              bg-white border border-neutral-200
              hover:bg-neutral-50 transition-colors
            "
					>
						<Archive size={16} />
						{showArchived ? "Ver Ativas" : "Ver Arquivadas"}
						{archivedLists.length > 0 && !showArchived && (
							<span
								className="
                px-2 py-0.5 rounded-full
                bg-yellow-100 text-yellow-700 text-xs font-semibold
              "
							>
								{archivedLists.length}
							</span>
						)}
					</button>
				</motion.div>

				{/* Conteúdo Principal */}
				{activeList && !showArchived ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="space-y-6"
					>
						{/* Formulário de Adicionar */}
						<AddItemForm onAdd={addItem} />

						{/* Lista de Itens */}
						{activeList.items.length > 0 ? (
							<div className="space-y-3">
								<div className="flex items-center justify-between px-2">
									<h2 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">
										Itens ({activeList.items.length})
									</h2>
									<p className="text-sm text-neutral-500">
										{activeList.items.filter((i) => i.completed).length}{" "}
										completos
									</p>
								</div>

								<Reorder.Group
									axis="y"
									values={activeList.items}
									onReorder={reorderItems}
									className="space-y-2"
								>
									<AnimatePresence>
										{activeList.items
											.sort((a, b) => a.order - b.order)
											.map((item) => (
												<Reorder.Item
													key={item.id}
													value={item}
													className="cursor-grab active:cursor-grabbing"
												>
													<GroceryItemComponent
														item={item}
														onToggle={(id) =>
															updateItem(id, { completed: !item.completed })
														}
														onDelete={removeItem}
													/>
												</Reorder.Item>
											))}
									</AnimatePresence>
								</Reorder.Group>
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
				) : showArchived ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-3"
					>
						<h2 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide px-2 mb-4">
							Listas Arquivadas ({archivedLists.length})
						</h2>
						{archivedLists.length === 0 ? (
							<div className="text-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed border-neutral-200">
								<Archive size={48} className="text-neutral-300 mx-auto mb-4" />
								<p className="text-neutral-400">Nenhuma lista arquivada</p>
							</div>
						) : (
							archivedLists.map((list) => (
								<div
									key={list.id}
									className="bg-white rounded-2xl border border-neutral-200 p-4"
								>
									<div className="flex items-start justify-between mb-2">
										<div>
											<h3 className="font-semibold text-neutral-800">
												{list.name}
											</h3>
											<p className="text-sm text-neutral-500">
												{list.items.length}{" "}
												{list.items.length === 1 ? "item" : "itens"} •{" "}
												{new Date(list.updatedAt).toLocaleDateString("pt-BR")}
											</p>
										</div>
										<button
											type="button"
											onClick={() => deleteList(list.id)}
											className="p-2 rounded-lg hover:bg-red-50 transition-colors"
										>
											<Archive size={16} className="text-red-500" />
										</button>
									</div>
								</div>
							))
						)}
					</motion.div>
				) : null}

				<Footer />
			</div>
		</div>
	);
}
