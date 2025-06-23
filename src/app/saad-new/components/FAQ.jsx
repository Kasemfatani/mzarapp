"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";

export const FAQ = () => {
	const [faqs, setFaqs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFAQs = async () => {
			setLoading(true);
			try {
				
				const response = await axios.get(`https://app.mzarapp.com/api/customer/faq-ar`);
				setFaqs(response.data.data);
				// console.log(response.data.data);
			} catch (error) {
				setError("Failed to fetch FAQs. Please try again later.");
				console.error("Error fetching FAQ data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFAQs();
	}, []);

	return (
		<section className="w-full overflow-hidden ">
			<div className="w-full px-4 sm:px-8 lg:px-[66px] py-8 lg:py-[57px]">
				<h1 className="text-center text-3xl sm:text-4xl lg:text-5xl text-wrap font-bold leading-tight sm:leading-tight lg:leading-normal tracking-tight">
					الأسئلة الشائعة
				</h1>
				<br />
				<p className="text-center text-gray-500 text-base sm:text-lg">
					نحن سعداء للإجابة على أسئلتكم
				</p>

				<div className="w-full max-w-4xl mx-auto mt-10">
					{loading && <p className="text-center">Loading...</p>}
					{error && <p className="text-center text-red-500">{error}</p>}
					{!loading && !error && (
						<div className="space-y-4 ">
							{faqs.map((faq) => (
								<details
									key={faq.id}
									className="group [&_summary::-webkit-details-marker]:hidden">
									<summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer">
										<h2 className="text-lg font-medium">{faq.question}</h2>

										<svg
											className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</summary>

									<p className="px-4 pt-4 text-gray-900">{faq.answer}</p>
								</details>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default FAQ;
