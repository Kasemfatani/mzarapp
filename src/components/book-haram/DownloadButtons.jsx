"use client";

export const DownloadButtons = ({ language }) => {
	return (
		<div
			className="flex flex-col justify-center items-center sm:flex-row gap-3 overflow-hidden mt-8"
			role="group"
			aria-label={language === 'ar' ? 'تنزيل التطبيق' : 'Download app'}>
			<a
				href="https://onelink.to/yb2xky"
				className="flex w-[174px] shrink-0 h-[52px] bg-black rounded-lg items-center justify-center hover:bg-gray-800 transition-colors gap-4"
				aria-label="Get it on Google Play">
				<img src="/Google_Play_logo.png" alt="Google Play logo" />
				<div className="flex flex-col">
					<span className="text-white text-xs font-medium">{language === 'ar' ? 'احصل عليه من' : 'GET IT ON'}</span>
					<span className="text-white text-lg font-medium">Google Play</span>
				</div>
			</a>
			<a
				href="https://onelink.to/yb2xky"
				className="flex w-[174px] shrink-0 h-[52px] bg-black rounded-lg items-center justify-center hover:bg-gray-800 transition-colors gap-4"
				aria-label="Download on the App Store">
				<img src="/apple_logo.png" alt="Apple logo" />
				<div className="flex flex-col">
					<span className="text-white text-xs font-medium">{language === 'ar' ? 'حمله من' : 'Download on the'}</span>
					<span className="text-white text-lg font-medium">App Store</span>
				</div>
			</a>
		</div>
	);
};

export default DownloadButtons;
