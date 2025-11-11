"use client";

export const DownloadButtonsSmall = ({ language }) => {
	return (
		<div
			className="flex flex-row justify-center items-center sm:flex-row gap-1 md:gap-3 overflow-hidden md:mt-8"
			role="group"
			aria-label={language === 'ar' ? 'تنزيل التطبيق' : 'Download app'}>
			<a
				href="https://onelink.to/yb2xky"
				target="_blank"
				className="flex  md:w-[174px] shrink-0 md:h-[52px] bg-black rounded-lg items-center justify-center hover:bg-gray-800 transition-colors px-2 py-1 md:p-0 gap-1 md:gap-4"
				aria-label="Get it on Google Play">
				<img src="/Google_Play_logo.png" alt="Google Play logo" className="w-[10px] md:w-auto"/>
				<div className="flex flex-col">
					<span className="text-white text-[8px] md:text-xs md:font-medium">{language === 'ar' ? 'احصل عليه من' : 'GET IT ON'}</span>
					<span className="text-white text-[10px] md:text-lg md:font-medium">Google Play</span>
				</div>
			</a>
			<a
				href="https://onelink.to/yb2xky"
				target="_blank"
				className="flex md:w-[174px] shrink-0 md:h-[52px] bg-black rounded-lg items-center justify-center hover:bg-gray-800 transition-colors px-2 py-1 md:p-0 gap-1 md:gap-4"
				aria-label="Download on the App Store">
				<img src="/apple_logo.png" alt="Apple logo" className="w-[10px] md:w-auto" />
				<div className="flex flex-col">
					<span className="text-white text-[8px] md:text-xs md:font-medium">{language === 'ar' ? 'حمله من' : 'Download on the'}</span>
					<span className="text-white text-[10px] md:text-lg md:font-medium">App Store</span>
				</div>
			</a>
		</div>
	);
};

export default DownloadButtonsSmall;
