"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Archive, Trash2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { useLists } from "@/hooks/useLists";

export default function Arquivados() {
	const { archivedLists, deleteList, isLoaded } = useLists();

	if (!isLoaded) return <Loading />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-cream-50">
			<div className="max-w-2xl mx-auto px-4 py-8 relative min-h-dvh">
				<Header backHref="/" />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="mb-6"
				>
					<div className="flex items-center gap-2 mb-1">
						<Archive size={20} className="text-orange-400" />
						<h2 className="text-xl font-semibold text-neutral-800">
							Listas arquivadas
						</h2>
					</div>
					<p className="text-sm text-neutral-500">
						{archivedLists.length === 0
							? "Nenhuma lista arquivada ainda."
							: `${archivedLists.length} ${archivedLists.length === 1 ? "lista arquivada" : "listas arquivadas"}`}
					</p>
				</motion.div>

				<AnimatePresence mode="popLayout">
					{archivedLists.length === 0 ? (
						<motion.div
							key="empty"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="flex flex-col items-center justify-center py-20 text-neutral-400"
						>
							<Archive size={48} className="mb-4 opacity-30" />
							<p className="text-base">Nenhuma lista por aqui ainda.</p>
							<p className="text-sm mt-1">
								Conclua uma lista na tela principal para arquivá-la.
							</p>
						</motion.div>
					) : (
						<motion.ul className="flex flex-col gap-3 pb-16">
							{archivedLists.map((list, index) => {
								const completedCount = list.items.filter(
									(item) => item.completed,
								).length;
								const formattedDate = new Intl.DateTimeFormat("pt-BR", {
									day: "2-digit",
									month: "short",
									year: "numeric",
								}).format(new Date(list.updatedAt));

								return (
									<motion.li
										key={list.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, x: -100 }}
										transition={{ delay: index * 0.05 }}
										layout
										className="bg-white rounded-2xl shadow-md px-5 py-4 flex items-center justify-between gap-4"
									>
										<div className="flex-1 min-w-0">
											<p className="font-semibold text-neutral-800 truncate">
												{list.name}
											</p>
											<p className="text-sm text-neutral-500 mt-0.5">
												{list.items.length === 0
													? "Sem itens"
													: `${completedCount} de ${list.items.length} ${list.items.length === 1 ? "item" : "itens"} concluído${completedCount !== 1 ? "s" : ""}`}{" "}
												· {formattedDate}
											</p>
										</div>
										<button
											type="button"
											onClick={() => deleteList(list.id)}
											className="
												flex-shrink-0 w-9 h-9 flex items-center justify-center
												rounded-xl text-neutral-400
												hover:bg-red-50 hover:text-red-500
												transition-colors duration-200
											"
											aria-label={`Excluir lista ${list.name}`}
										>
											<Trash2 size={18} />
										</button>
									</motion.li>
								);
							})}
						</motion.ul>
					)}
				</AnimatePresence>

				<Footer />
			</div>
		</div>
	);
}
