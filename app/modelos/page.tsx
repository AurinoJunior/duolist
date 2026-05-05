"use client";

import { useRouter } from "next/navigation";
import { useLists } from "@/hooks/useLists";
import { TEMPLATES } from "@/lib/templates";

export default function ModelosPage() {
	const router = useRouter();
	const { createListFromTemplate } = useLists();

	const handleSelect = (templateId: string) => {
		const template = TEMPLATES.find((t) => t.id === templateId);
		if (!template) return;
		createListFromTemplate(template);
		router.push("/");
	};

	return (
		<main className="min-h-screen bg-cream-50 px-4 py-8 max-w-lg mx-auto">
			<div className="mb-8 anim-fade-in-down">
				<h1 className="text-2xl font-bold text-neutral-800">
					Escolha um modelo
				</h1>
				<p className="text-neutral-500 text-sm mt-1">
					Comece com uma lista pré-preenchida
				</p>
			</div>

			<div className="grid grid-cols-2 gap-3">
				{TEMPLATES.map((template, index) => (
					<button
						key={template.id}
						type="button"
						className="
							anim-fade-in-up
							text-left p-4 rounded-2xl
							bg-white border border-neutral-200
							hover:shadow-md hover:scale-[1.02]
							transition-all duration-200
							flex flex-col gap-2
						"
						style={{ animationDelay: `${index * 0.07}s` }}
						onClick={() => handleSelect(template.id)}
					>
						<span className="text-3xl">{template.emoji}</span>
						<div>
							<p className="font-semibold text-neutral-800 text-sm leading-tight">
								{template.name}
							</p>
							<p className="text-xs text-neutral-500 mt-0.5">
								{template.description}
							</p>
						</div>
						<p className="text-xs font-medium text-orange-400">
							{template.items.length} itens
						</p>
					</button>
				))}
			</div>
		</main>
	);
}
