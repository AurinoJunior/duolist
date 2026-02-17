import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export const Header = () => {
	return (
		<motion.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="mb-8"
		>
			<div className="flex items-center gap-3 mb-2">
				<ShoppingBag size={32} className="text-orange-400" />
				<h1 className="text-3xl font-bold text-neutral-800">
					Lista de Compras
				</h1>
			</div>
			<p className="text-neutral-600 ml-11">
				Organize suas compras de forma simples e eficiente
			</p>
		</motion.header>
	);
};
