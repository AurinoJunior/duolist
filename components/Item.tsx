"use client";

import { motion } from "framer-motion";
import { GripVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import type { TItem } from "@/types";

interface ItemProps {
	item: TItem;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onRename: (id: string, name: string) => void;
	isDragging?: boolean;
}

/**
 * Componente individual de item da lista
 * Exibe checkbox, nome e botão de deletar
 */
export function Item({
	item,
	onToggle,
	onDelete,
	onRename,
	isDragging = false,
}: ItemProps) {
	const category = CATEGORIES.find((c) => c.value === item.category);
	const [isEditing, setIsEditing] = useState(false);
	const [draft, setDraft] = useState(item.name);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) inputRef.current?.focus();
	}, [isEditing]);

	const startEditing = () => {
		setDraft(item.name);
		setIsEditing(true);
	};

	const commitEdit = () => {
		const trimmed = draft.trim();
		if (trimmed && trimmed !== item.name) onRename(item.id, trimmed);
		setIsEditing(false);
	};

	const cancelEdit = () => {
		setDraft(item.name);
		setIsEditing(false);
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: -100 }}
			className={`
        group relative flex items-center gap-3 p-4 rounded-2xl
        bg-white border border-neutral-100
        transition-all duration-200
        ${isDragging ? "shadow-lg scale-105 rotate-1" : "hover:shadow-md"}
        ${item.completed ? "opacity-60" : ""}
      `}
		>
			{/* Drag Handle */}
			<div className="cursor-grab active:cursor-grabbing opacity-40 group-hover:opacity-100 transition-opacity">
				<GripVertical size={20} className="text-neutral-400" />
			</div>

			{/* Checkbox */}
			<button
				type="button"
				onClick={() => onToggle(item.id)}
				className="flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
				style={{
					borderColor: item.completed ? category?.color : "#D1D5DB",
					backgroundColor: item.completed ? category?.color : "transparent",
				}}
			>
				{item.completed && (
					<motion.svg
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
					>
						<path
							d="M3 8L6.5 11.5L13 5"
							stroke="white"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</motion.svg>
				)}
			</button>

			{/* Item Name */}
			<div className="flex-1 min-w-0">
				{isEditing ? (
					<input
						ref={inputRef}
						value={draft}
						onChange={(e) => setDraft(e.target.value)}
						onBlur={commitEdit}
						onKeyDown={(e) => {
							if (e.key === "Enter") commitEdit();
							if (e.key === "Escape") cancelEdit();
						}}
						className="
							w-full text-base font-medium bg-orange-50
							border border-orange-300 rounded-lg px-2 py-0.5
							outline-none focus:ring-2 focus:ring-orange-300
							text-neutral-800
						"
					/>
				) : (
					<p
						onClick={startEditing}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") startEditing();
						}}
						className={`
							text-base font-medium transition-all duration-200 cursor-text select-none
							${item.completed ? "line-through text-neutral-400" : "text-neutral-800"}
						`}
					>
						{item.name}
					</p>
				)}
			</div>

			{/* Delete Button */}
			<button
				type="button"
				onClick={() => onDelete(item.id)}
				className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-red-50"
			>
				<Trash2 size={16} className="text-red-500" />
			</button>
		</motion.div>
	);
}
