"use client";

import { Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AddItemForm } from "@/components/AddItemForm";
import { ArchiveButton } from "@/components/ArchiveButton";
import { Header } from "@/components/Header";
import { ItensList } from "@/components/ItensList";
import { ListSelector } from "@/components/ListSelector";
import { Loading } from "@/components/Loading";
import { useLists } from "@/hooks/useLists";

export default function Home() {
	const {
		lists,
		addItem,
		updateItem,
		removeItem,
		activeList,
		isLoaded,
		createList,
		selectList,
		archiveList,
		deleteList,
	} = useLists();

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [showFab, setShowFab] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = formRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => setShowFab(!entry.isIntersecting),
			{ threshold: 0, rootMargin: "0px" },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [isLoaded]);

	const handleFabClick = useCallback(() => {
		setIsFormOpen(true);
	}, []);

	if (!isLoaded) return <Loading />;

	return (
		<div>
			<Header />
			<div className="space-y-6">
				<ListSelector
					lists={lists}
					activeListId={activeList?.id || null}
					onSelect={selectList}
					onCreate={createList}
					onArchive={archiveList}
					onDelete={deleteList}
				/>
				{activeList && (
					<ArchiveButton activeList={activeList} archiveList={archiveList} />
				)}
				{activeList && (
					<div ref={formRef}>
						<AddItemForm
							onAdd={addItem}
							isOpen={isFormOpen}
							onOpenChange={setIsFormOpen}
						/>
					</div>
				)}
				<ItensList
					activeList={activeList}
					removeItem={removeItem}
					updateItem={updateItem}
				/>
			</div>

			{/* FAB flutuante */}
			{activeList && (
				<button
					type="button"
					onClick={handleFabClick}
					className={`
						fixed bottom-6 right-6 z-50
						w-14 h-14 rounded-full
						bg-gradient-to-br from-orange-400 to-peach-400
						text-white shadow-xl
						flex items-center justify-center
						hover:scale-110 hover:shadow-2xl
						transition-all duration-200
						${
							showFab && !isFormOpen
								? "opacity-100 pointer-events-auto"
								: "opacity-0 pointer-events-none"
						}
					`}
				>
					<Plus size={26} />
				</button>
			)}
		</div>
	);
}
