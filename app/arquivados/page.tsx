"use client";

import { ArchivedLists } from "@/components/ArchivedLists";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { useLists } from "@/hooks/useLists";

export default function Arquivados() {
	const { archivedLists, deleteList, isLoaded } = useLists();

	if (!isLoaded) return <Loading />;

	return (
		<>
			<Header backHref="/" />
			<div className="mb-6 anim-fade-in-up anim-delay-1">
				<h2 className="text-xl font-semibold text-neutral-800 mb-1">
					Listas arquivadas
				</h2>

				<p className="text-sm text-neutral-500">
					{archivedLists.length === 0
						? "Nenhuma lista arquivada ainda."
						: `${archivedLists.length} ${archivedLists.length === 1 ? "lista arquivada" : "listas arquivadas"}`}
				</p>
			</div>
			<ArchivedLists archivedLists={archivedLists} onDelete={deleteList} />
		</>
	);
}
