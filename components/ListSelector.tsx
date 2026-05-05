"use client";

import {
	Archive,
	ChevronDown,
	LayoutTemplate,
	Plus,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { TList } from "@/types";

interface ListSelectorProps {
	lists: TList[];
	activeListId: string | null;
	onSelect: (id: string) => void;
	onCreate: (name: string) => void;
	onArchive: (id: string) => void;
	onDelete: (id: string) => void;
}

export function ListSelector({
	lists,
	activeListId,
	onSelect,
	onCreate,
	onArchive,
	onDelete,
}: ListSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [newListName, setNewListName] = useState("");
	const containerRef = useRef<HTMLDivElement>(null);

	const activeList = lists.find((l) => l.id === activeListId);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setIsCreating(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	const handleCreate = () => {
		if (newListName.trim()) {
			onCreate(newListName.trim());
			setNewListName("");
			setIsCreating(false);
		}
	};

	return (
		<div className="relative anim-fade-in-up anim-delay-1" ref={containerRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="
          w-full px-6 py-4 rounded-2xl
          bg-white border border-neutral-200
          flex items-center justify-between
          hover:shadow-md transition-all duration-200
        "
			>
				<div className="flex-1 text-left">
					<p className="text-sm text-neutral-500 mb-0.5">Lista Atual</p>
					<p className="text-lg font-semibold text-neutral-800">
						{activeList?.name || "Selecione uma lista"}
					</p>
				</div>
				<div
					className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
				>
					<ChevronDown size={20} className="text-neutral-400" />
				</div>
			</button>

			<div
				className={`
          absolute top-full left-0 right-0 mt-2
          bg-white rounded-2xl border border-neutral-200
          shadow-xl overflow-hidden z-50
          transition-all duration-200 origin-top
          ${
						isOpen
							? "opacity-100 translate-y-0 pointer-events-auto"
							: "opacity-0 -translate-y-2 pointer-events-none"
					}
        `}
			>
				<div className="max-h-64 overflow-y-auto">
					{lists.length === 0 ? (
						<div className="px-6 py-8 text-center text-neutral-500">
							<p className="text-sm">Nenhuma lista criada ainda</p>
						</div>
					) : (
						lists.map((list) => (
							<div
								key={list.id}
								className="
                      group flex items-center gap-2
                      px-4 py-3 hover:bg-neutral-50
                      transition-colors border-b border-neutral-100
                      last:border-b-0
                    "
							>
								<button
									type="button"
									onClick={() => {
										onSelect(list.id);
										setIsOpen(false);
									}}
									className="flex-1 text-left"
								>
									<p
										className={`
                        font-medium
                        ${list.id === activeListId ? "text-orange-500" : "text-neutral-800"}
                      `}
									>
										{list.name}
									</p>
									<p className="text-xs text-neutral-500 mt-0.5">
										{list.items.length}{" "}
										{list.items.length === 1 ? "item" : "itens"}
									</p>
								</button>

								<div className="flex gap-3">
									<button
										type="button"
										onClick={() => {
											onArchive(list.id);
											setIsOpen(false);
										}}
										className="p-2 rounded-lg bg-yellow-50"
										title="Arquivar"
									>
										<Archive size={18} className="text-yellow-800" />
									</button>
									<button
										type="button"
										onClick={() => onDelete(list.id)}
										className="p-2 rounded-lg bg-red-50"
										title="Deletar"
									>
										<Trash2 size={18} className="text-red-500" />
									</button>
								</div>
							</div>
						))
					)}
				</div>

				<div className="border-t border-neutral-200 p-3 flex flex-col gap-2">
					{!isCreating ? (
						<button
							type="button"
							onClick={() => setIsCreating(true)}
							className="
                    w-full py-2.5 px-4 rounded-xl
                    bg-gradient-to-r from-orange-400 to-peach-400
                    text-white font-medium text-sm
                    flex items-center justify-center gap-2
                    hover:shadow-md transition-all duration-200
                  "
						>
							<Plus size={16} />
							Nova Lista
						</button>
					) : (
						<div className="flex gap-2">
							<input
								type="text"
								value={newListName}
								onChange={(e) => setNewListName(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleCreate()}
								placeholder="Nome da lista..."
								className="
                      flex-1 px-3 py-2 rounded-lg
                      border border-neutral-200
                      focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                      outline-none text-sm text-neutral-800 placeholder-neutral-400
                    "
							/>
							<button
								type="button"
								onClick={handleCreate}
								disabled={!newListName.trim()}
								className="
                      px-4 py-2 rounded-lg
                      bg-orange-400 text-white text-sm font-medium
                      disabled:opacity-50 disabled:cursor-not-allowed
                      hover:bg-orange-500 transition-colors
                    "
							>
								Criar
							</button>
						</div>
					)}
					<Link href="/modelos" onClick={() => setIsOpen(false)}>
						<button
							type="button"
							className="
								w-full py-2.5 px-4 rounded-xl
								bg-cream-100 border border-neutral-200
								text-neutral-600 font-medium text-sm
								flex items-center justify-center gap-2
								hover:bg-cream-200 transition-all duration-200
							"
						>
							<LayoutTemplate size={16} />
							Escolha um modelo
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
