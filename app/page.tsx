"use client";

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
				<AddItemForm onAdd={addItem} />
				<ItensList
					activeList={activeList}
					removeItem={removeItem}
					reorderItems={reorderItems}
					updateItem={updateItem}
				/>
			</div>
		</div>
	);
}
