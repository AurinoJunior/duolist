import { Archive, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
	backHref?: string;
}

export const Header = ({ backHref }: HeaderProps) => {
	return (
		<header className="mb-8 anim-fade-in-down">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center gap-3">
					<ShoppingBag size={32} className="text-orange-400" />
					<h1 className="text-3xl font-bold text-neutral-800">Duolist</h1>
				</div>
				{backHref ? (
					<Link href={backHref}>
						<div className="w-8 h-8 bg-orange-400 rounded-xl flex items-center justify-center">
							<ArrowLeft size={18} className="text-orange-100" />
						</div>
					</Link>
				) : (
					<Link href="/arquivados">
						<div className="h-8 px-3 bg-orange-400 rounded-xl flex items-center gap-1.5">
							<Archive size={16} className="text-orange-100" />
							<span className="text-orange-100 text-sm font-medium">
								Arquivados
							</span>
						</div>
					</Link>
				)}
			</div>
			<p className="text-neutral-600">
				Organizando as compras, pra não voltar só com besteira.
			</p>
		</header>
	);
};
