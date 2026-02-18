"use client";

import { motion } from "framer-motion";
import { Archive } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ItensList } from "@/components/ItensList";
import { ListSelector } from "@/components/ListSelector";
import { Loading } from "@/components/Loading";
import { useGroceryLists } from "@/hooks/useGroceryLists";

export default function Home() {
	const {
		addItem,
		reorderItems,
		updateItem,
		removeItem,
		activeList,
		activeLists,
		isLoaded,
		createList,
		selectList,
		archiveList,
		deleteList,
	} = useGroceryLists();

	if (!isLoaded) return <Loading />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-cream-50">
			<div className="max-w-2xl mx-auto px-4 py-8 relative h-dvh">
				<Header />
				<ListSelector
					lists={activeLists}
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
			</div>
		</div>
	);
}
