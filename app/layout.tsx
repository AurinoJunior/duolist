import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-dm-sans",
});

export const metadata: Metadata = {
	title: "Lista de Compras",
	description: "Organize suas compras de forma simples e eficiente",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body className={`${dmSans.variable} font-sans antialiased`}>
				<div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-cream-50">
					<div className="max-w-2xl mx-auto px-4 py-8 relative min-h-dvh">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
