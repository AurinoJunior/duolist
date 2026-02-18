"use client";

import { motion } from "framer-motion";
import { Archive } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ItensList } from "@/components/ItensList";
import { ListSelector } from "@/components/ListSelector";
import { Loading } from "@/components/Loading";
import { useLists } from "@/hooks/useLists";

export default function Home() {
	const {
		lists,
		addItem,
		reorderItems,
		updateItem,
		removeItem,
		activeList,
		isLoaded,
		createList,
		selectList,
		archiveList,
		deleteList,
	} = useLists();

	if (!isLoaded) return <Loading />;

	return (
		<>
			<Header />
			<ListSelector
				lists={lists}
				activeListId={activeList?.id || null}
				onSelect={selectList}
				onCreate={createList}
				onArchive={archiveList}
				onDelete={deleteList}
			/>
			{activeList?.id && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="mb-6 flex justify-end"
				>
					<button
						type="button"
						onClick={() => archiveList(activeList.id)}
						className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              text-sm font-medium
              bg-white border border-neutral-200
              hover:bg-neutral-50 transition-colors
            "
					>
						<Archive size={16} />
						Concluir
					</button>
				</motion.div>
			)}
			<ItensList
				activeList={activeList}
				addItem={addItem}
				removeItem={removeItem}
				reorderItems={reorderItems}
				updateItem={updateItem}
			/>
			<Footer />
		</>
	);
}
