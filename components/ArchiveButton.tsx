import { Archive } from "lucide-react";
import type { TList } from "@/types";

interface IArchiveButtonProps {
	activeList: TList;
	archiveList: (id: string) => void;
}

export const ArchiveButton = ({
	activeList,
	archiveList,
}: IArchiveButtonProps) => {
	return (
		<div className="flex justify-end anim-fade-in anim-delay-2">
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
		</div>
	);
};
