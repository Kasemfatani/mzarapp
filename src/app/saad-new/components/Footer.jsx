"use client";

export const Footer = () => {
	return (
		<section className="w-full overflow-hidden bg-[linear-gradient(to_right,_#025AB4_0%,_#1AC5BD_50%,_#87DCB5_100%)]">
			
			<div className="w-full px-4 sm:px-8 lg:px-[66px] pb-4 pt-8 lg:pt-[57px]">
				
				<h1 className="text-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
					ماذا تنتظر؟ حمل الآن!
				</h1>
				<div
					className="flex flex-col justify-center items-center sm:flex-row gap-3 overflow-hidden mt-8"
					role="group"
					aria-label="Download app"
				>
					<a
						href="https://onelink.to/yb2xky"
						className="flex w-[174px] shrink-0 h-[52px] bg-black rounded-lg items-center justify-center hover:bg-gray-800 transition-colors gap-4"
						aria-label="Get it on Google Play"
					>
						<img src="Google_Play_logo.png" alt="" />
						<div className="flex flex-col">
							<span className="text-white text-xs font-medium">
								احصل عليه من
							</span>
							<span className="text-white text-lg font-medium">
								Google Play
							</span>
						</div>
					</a>
					<a
						href="https://onelink.to/yb2xky"
						className="flex w-[174px] shrink-0 h-[52px] bg-black rounded-lg items-center justify-center hover:bg-gray-800 transition-colors gap-4"
						aria-label="Download on the App Store"
					>
						<img src="apple_logo.png" alt="" />
						<div className="flex flex-col">
							<span className="text-white text-xs font-medium">حمله من</span>
							<span className="text-white text-lg font-medium">App Store</span>
						</div>
					</a>
				</div>
				<p className="text-white text-center mt-8 text-sm" >
  جميع الحقوق محفوظة لشركة <span className="font-semibold">mzarapp.com</span> © {new Date().getFullYear()}
</p>
			</div>
		</section>
	);
};

export default Footer;
