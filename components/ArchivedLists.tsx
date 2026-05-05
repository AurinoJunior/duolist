import { Archive, Trash2 } from "lucide-react";
import type { TList } from "@/types";

interface IArchivedListsProps {
	archivedLists: TList[];
	onDelete: (id: string) => void;
}

export const ArchivedLists = ({
	archivedLists,
	onDelete,
}: IArchivedListsProps) => {
	return (
		<>
			{archivedLists.length === 0 ? (
				<div className="anim-fade-in-up flex flex-col items-center justify-center py-20 text-neutral-400">
					<Archive size={48} className="mb-4 opacity-30" />
					<p className="text-base">Nenhuma lista por aqui ainda.</p>
					<p className="text-sm mt-1">
						Conclua uma lista na tela principal para arquivá-la.
					</p>
				</div>
			) : (
				<ul className="flex flex-col gap-3 pb-16">
					{archivedLists.map((list, index) => {
						const formattedDate = new Intl.DateTimeFormat("pt-BR", {
							day: "2-digit",
							month: "long",
							year: "numeric",
						}).format(new Date(list.updatedAt));

						return (
							<li
								key={list.id}
								className="anim-fade-in-up bg-white rounded-2xl shadow-md px-5 py-4 flex items-center justify-between gap-4"
								style={{ animationDelay: `${index * 0.05}s` }}
							>
								<div className="flex-1 min-w-0">
									<p className="font-semibold text-neutral-800 truncate">
										{list.name}
									</p>
									<p className="text-sm text-neutral-500 mt-0.5">
										{list.items.length === 0
											? "Sem itens"
											: `${list.items.length} ${list.items.length === 1 ? "item" : "itens"} / ${formattedDate}`}
									</p>
								</div>
								<button
									type="button"
									onClick={() => onDelete(list.id)}
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
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};
