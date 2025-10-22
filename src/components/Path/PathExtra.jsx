"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export default function PathExtra({ data = {}, language = "en", pathId }) {
	return (
		<>
			<div className="cont-desc">
				<h3>{language === "en" ? "Description" : "وصف الرحلة"}</h3>
				<p className="desc">{data.description}</p>
			</div>

			<div className="activities">
				<h5>{language === "en" ? "Activities" : "الأنشطة"}</h5>
				<p>
					{language === "en"
						? "See the activities and places you will visit"
						: "شاهد النشاطات والأماكن التي ستزورها"}
				</p>
				<div className="activities-grid">
					{Array.isArray(data.in_directions) &&
						data.in_directions.map((activity, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: -50 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.8 }}
								transition={{
									delay: index * 0.2,
									type: "spring",
									bounce: 0.2,
									duration: 0.3,
								}}
								className="activity-cont"
							>
								<Image
									src={activity.image}
									alt={`${data.name} image`}
									width={200}
									height={200}
								/>
								<p>{activity.name}</p>
							</motion.div>
						))}
				</div>
			</div>

		</>
	);
}
