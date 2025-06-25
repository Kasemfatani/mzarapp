"use client";

import { DownloadButtons } from "./DownloadButtons";

export const Footer = ({ language }) => {
	return (
		<section className="w-full overflow-hidden bg-[linear-gradient(to_right,_#025AB4_0%,_#1AC5BD_50%,_#87DCB5_100%)]">
			
			<div className="w-full px-4 sm:px-8 lg:px-[66px] pb-4 pt-8 lg:pt-[57px]">
				
				<h1 className="text-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
					{language === 'ar' ? 'ماذا تنتظر؟' : 'What are you waiting for?'}
				</h1>
				<h1 className="text-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
					{language === 'ar' ? 'ابدأ الآن تجربتك التفاعلية ' : 'Start your interactive experience now!'}
				</h1>
				<DownloadButtons language={language} />
				<p className="text-white text-center mt-8 text-sm" >
  {language === 'ar' ? 'جميع الحقوق محفوظة لشركة' : 'All rights reserved to'} <span className="font-semibold">mzarapp.com</span> © {new Date().getFullYear()}
</p>
			</div>
		</section>
	);
};

export default Footer;
