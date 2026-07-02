"use client";

import { motion } from "framer-motion";

export default function UmrahSectionReveal({ children, className }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 14 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.18 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={className ?? "w-full"}
		>
			{children}
		</motion.div>
	);
}
