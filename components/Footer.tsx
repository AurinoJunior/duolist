import { motion } from "framer-motion";

export const Footer = () => {
	return (
		<motion.footer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.4 }}
			className="w-full text-center text-sm text-neutral-400 absolute bottom-3 left-0"
		>
			<p>Feito com 🧡 para facilitar suas compras</p>
		</motion.footer>
	);
};
