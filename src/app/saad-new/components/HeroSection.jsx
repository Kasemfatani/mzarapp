export const HeroSection = () => {
	return (
		<section className="relative w-full lg:h-screen overflow-hidden bg-cover bg-center bg-[url('/banner_2.png')]">
			<div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-10 lg:px-[66px] py-6 sm:py-8 md:py-10 lg:py-[57px] flex items-center">
				<div className="flex flex-col md:flex-row justify-center lg:justify-between gap-5 w-full">
					<div
						className="flex flex-col justify-center items-center
 my-auto"
					>
						<div className="font-semibold ">
							<h1 className="text-white text-3xl md:text-5xl lg:text-6xl text-wrap">
								استمتع بتجربة الواقع
							</h1>
							<h1 className="text-white text-3xl md:text-5xl lg:text-6xl text-wrap mt-6">
								المعزز في تطبيق مزار
							</h1>
							<br />
						</div>
						<div
							className="flex flex-col sm:flex-row gap-3 overflow-hidden mt-8"
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
									<span className="text-white text-xs font-medium">
										حمله من
									</span>
									<span className="text-white text-lg font-medium">
										App Store
									</span>
								</div>
							</a>
						</div>
					</div>
					<div className=" w-[100%] md:w-[40%] lg:w-[30%] relative flex justify-center items-center">
						<div class="w-[250px] h-[510px] bg-black rounded-[2.5rem] border-[6px] border-gray-900 shadow-lg relative flex flex-col items-center justify-start overflow-hidden">
							<iframe
									className="absolute top-0 left-0 w-full h-full"
									src="https://www.youtube.com/embed/WPeArLLXwZg"  // Replace with your video ID
									
									allow="accelerometer;clipboard-write;  gyroscope; picture-in-picture"
									allowFullScreen
									title="Embedded YouTube Video"
								></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
