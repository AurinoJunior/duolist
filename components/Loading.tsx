import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export const Loading = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-cream-50 flex items-center justify-center">
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			>
				<ShoppingBag size={40} className="text-orange-400" />
			</motion.div>
		</div>
	);
};
