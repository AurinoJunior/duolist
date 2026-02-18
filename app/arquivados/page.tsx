"use client";

import { motion } from "framer-motion";
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
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="mb-6"
			>
				<h2 className="text-xl font-semibold text-neutral-800 mb-1">
					Listas arquivadas
				</h2>

				<p className="text-sm text-neutral-500">
					{archivedLists.length === 0
						? "Nenhuma lista arquivada ainda."
						: `${archivedLists.length} ${archivedLists.length === 1 ? "lista arquivada" : "listas arquivadas"}`}
				</p>
			</motion.div>
			<ArchivedLists archivedLists={archivedLists} onDelete={deleteList} />
		</>
	);
}
